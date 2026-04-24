// src/service/api.js
class StrapiAPI {
    constructor() {
        this.baseURL = import.meta.env.VITE_STRAPI_URL || 'https://api.pikachusear.space';
        this.apiURL = `${this.baseURL}/api`;
        this.token = import.meta.env.VITE_STRAPI_TOKEN;
    }

    // Helper method to get headers with authentication
    getHeaders() {
        const headers = {
            'Content-Type': 'application/json',
        };

        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        return headers;
    }

    async get(endpoint) {
        try {
            const response = await fetch(`${this.apiURL}${endpoint}`, {
                method: 'GET',
                headers: this.getHeaders(),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error('API Error:', error);
            return null;
        }
    }

    async post(endpoint, data) {
        try {
            const response = await fetch(`${this.apiURL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data })
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // Helper function to build image URL
    // Strapi v5: image is a flat object with a .url property directly on it
    getImageUrl(image) {
        if (!image?.url) return null;
        const url = image.url;
        return url.startsWith('https') ? url : `${this.baseURL}${url}`;
    }

    // About Section Data
    async getAbout() {
        const data = await this.get('/about?populate=*');
        if (!data) return null;

        return {
            title: data.title,
            description: data.description,
            secondaryDescription: data.secondaryDescription,
            image: this.getImageUrl(data.image),
            socialLinks: data.socialLinks || []
        };
    }

    // Experience Data
    async getExperiences() {
        const data = await this.get('/experiences?populate=*&sort=startDate:desc');
        if (!data) return null;

        return data.map(exp => ({
            id: exp.id,
            title: exp.title,
            company: exp.company,
            period: exp.period,
            startDate: exp.startDate,
            endDate: exp.endDate,
            description: exp.description,
            technologies: exp.technologies
        }));
    }

    // Projects List Data
    async getProjects() {
        const data = await this.get('/projects?populate=*&sort=order:asc');
        if (!data) return null;

        return data.map(project => ({
            // Strapi v5: single-entry endpoints require documentId, not numeric id
            id: project.documentId,
            title: project.title,
            description: project.description,
            image: this.getImageUrl(project.image),
            techStack: project.techStack || [],
            liveUrl: project.liveUrl,
            githubUrl: project.githubUrl,
            featured: project.featured || false,
            order: project.order || 0
        }));
    }

    // Get single project by id (Strapi v5: id param is documentId string)
    // FIX: Strapi v5 returns flat fields — removed all .attributes references
    // FIX: gallery is a plain array of image objects (no .data wrapper)
    async getProject(id) {
        const data = await this.get(`/projects/${id}?populate=*`);
        if (!data) return null;

        return {
            id: data.documentId,
            title: data.title,
            description: data.description,
            longDescription: data.longDescription,
            image: this.getImageUrl(data.image),
            gallery: (data.gallery || []).map(img => this.getImageUrl(img)).filter(Boolean),
            techStack: data.techStack || [],
            liveUrl: data.liveUrl,
            githubUrl: data.githubUrl,
            featured: data.featured || false,
            challenges: data.challenges,
            solutions: data.solutions,
            features: data.features || []
        };
    }

    // Skills Data
    async getSkills() {
        const data = await this.get('/skill-categories?populate=*&sort=order:asc');
        if (!data) return null;

        return data.map(category => ({
            id: category.id,
            category: category.name,
            skills: category.skills?.name || [],
            order: category.order || 0
        }));
    }

    // Blog Posts List Data
    async getBlogPosts() {
        const data = await this.get('/blog-posts?populate=*&sort=publishedAt:desc');
        if (!data) return null;

        return data.map(post => ({
            id: post.id,
            date: new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }).toUpperCase(),
            title: post.title,
            excerpt: post.excerpt,
            slug: post.slug,
            featuredImage: this.getImageUrl(post.featuredImage),
            content: post.content,
            publishedAt: post.publishedAt
        }));
    }

    // Get single blog post by slug
    // FIX: Strapi v5 returns flat fields — removed all .attributes references
    async getBlogPost(slug) {
        const data = await this.get(`/blog-posts?populate=*&filters[slug][$eq]=${slug}`);
        if (!data || data.length === 0) return null;

        const post = data[0];
        return {
            id: post.id,
            date: new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }).toUpperCase(),
            title: post.title,
            excerpt: post.excerpt,
            slug: post.slug,
            featuredImage: this.getImageUrl(post.featuredImage),
            content: post.content,
            publishedAt: post.publishedAt
        };
    }

    // Contact Form Submission
    /* async submitContact(formData) {
        return await this.post('/contacts', {
            name: formData.name,
            email: formData.email,
            message: formData.message,
            submittedAt: new Date().toISOString()
        });
    } */
}

export default new StrapiAPI();