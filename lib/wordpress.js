const WP_BASE = 'https://public-api.wordpress.com/wp/v2/sites/ljdblog.wordpress.com';

const HTML_ENTITIES = {
  '&nbsp;': ' ', '&amp;': '&', '&lt;': '<', '&gt;': '>',
  '&quot;': '"', '&#039;': "'", '&#8217;': '’', '&#8216;': '‘',
  '&#8220;': '“', '&#8221;': '”', '&#8211;': '–', '&#8212;': '—',
};

const decodeEntities = (str) =>
  str.replace(/&[#\w]+;/g, (entity) => HTML_ENTITIES[entity] ?? entity);

const getCategories = async () => {
  try {
    const res = await fetch(`${WP_BASE}/categories?per_page=100`, {
      next: { revalidate: 86400 }
    });
    if (!res.ok) return {};
    const cats = await res.json();
    return cats.reduce((acc, cat) => ({ ...acc, [cat.id]: cat.name }), {});
  } catch (err) {
    return {};
  }
};

const slugifyTag = (name) => name.toLowerCase().trim().replace(/\s+/g, '-');

export async function getPosts() {
  try {
    const cats = await getCategories();
    // Fetch all posts, paginating past the API's per-request cap.
    const PER_PAGE = 100;
    const MAX_PAGES = 5;
    const posts = [];
    for (let page = 1; page <= MAX_PAGES; page++) {
      const res = await fetch(
        `${WP_BASE}/posts?_fields=id,title,excerpt,date,modified,slug,categories&per_page=${PER_PAGE}&page=${page}`,
        { next: { revalidate: 3600 } }
      );
      if (!res.ok) break;
      const batch = await res.json();
      posts.push(...batch);
      if (batch.length < PER_PAGE) break;
    }
    if (!posts.length) return [];
    return posts.map(post => {
      const categoryNames = post.categories
        .map(id => cats[id])
        .filter(name => name && name.toLowerCase() !== 'uncategorized');
      const tag = categoryNames[0] || 'General';
      return {
        id: post.id,
        title: decodeEntities(post.title.rendered || 'Untitled'),
        excerpt: post.excerpt.rendered || '',
        date: new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }),
        dateISO: post.date,
        modifiedISO: post.modified || post.date,
        slug: post.slug,
        tag,
        type: slugifyTag(tag)
      };
    });
  } catch (err) {
    return [];
  }
}

export async function getPost(slug) {
  try {
    const res = await fetch(
      `${WP_BASE}/posts?slug=${encodeURIComponent(slug)}&_fields=id,title,content,excerpt,date,slug,jetpack_featured_media_url`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const posts = await res.json();
    if (!posts.length) return null;
    const post = posts[0];
    return {
      id: post.id,
      title: decodeEntities(post.title.rendered),
      content: post.content.rendered,
      excerpt: post.excerpt?.rendered ? decodeEntities(post.excerpt.rendered) : '',
      date: new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }),
      dateISO: post.date,
      featuredImage: post.jetpack_featured_media_url || null,
      slug: post.slug
    };
  } catch (err) {
    return null;
  }
}
