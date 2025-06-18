// src/service/api.js
class StrapiAPI {
    constructor() {
        this.baseURL = import.meta.env.VITE_STRAPI_URL || 'https://api.pikachusear.space';
        this.apiURL = `${this.baseURL}/api`;
    }

    async get(endpoint) {
        try {
            const response = await fetch(`${this.apiURL}${endpoint}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error('API Error:', error);
            return null; // Return null for error handling
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
    getImageUrl(image) {
        if (!image?.data?.attributes?.url) return null;
        const url = image.data.attributes.url;
        return url.startsWith('http') ? url : `${this.baseURL}${url}`;
    }

    // About Section Data
    async getAbout() {
        const data = await this.get('/about?populate=*');
        if (!data) return null;

        return {
            title: data.attributes.title,
            description: data.attributes.description,
            secondaryDescription: data.attributes.secondaryDescription,
            image: this.getImageUrl(data.attributes.image),
            socialLinks: data.attributes.socialLinks || []
        };
    }

    // Experience Data
    async getExperiences() {
        const data = await this.get('/experiences?populate=*&sort=startDate:desc');
        if (!data) return null;

        return data.map(exp => ({
            id: exp.id,
            title: exp.attributes.title,
            company: exp.attributes.company,
            period: exp.attributes.period,
            startDate: exp.attributes.startDate,
            endDate: exp.attributes.endDate,
            description: exp.attributes.description,
            technologies: exp.attributes.technologies || []
        }));
    }

    // Projects Data
    async getProjects() {
        const data = await this.get('/projects?populate=*&sort=order:asc');
        if (!data) return null;

        return data.map(project => ({
            id: project.id,
            title: project.attributes.title,
            description: project.attributes.description,
            image: this.getImageUrl(project.attributes.image),
            techStack: project.attributes.techStack || [],
            liveUrl: project.attributes.liveUrl,
            githubUrl: project.attributes.githubUrl,
            featured: project.attributes.featured || false,
            order: project.attributes.order || 0
        }));
    }

    // Skills Data
    async getSkills() {
        const data = await this.get('/skill-categories?populate=*&sort=order:asc');
        if (!data) return null;

        return data.map(category => ({
            id: category.id,
            category: category.attributes.name,
            skills: category.attributes.skills?.map(skill => skill.name) || [],
            order: category.attributes.order || 0
        }));
    }

    // Blog Posts Data
    async getBlogPosts() {
        const data = await this.get('/blog-posts?populate=*&sort=publishedAt:desc');
        if (!data) return null;

        return data.map(post => ({
            id: post.id,
            date: new Date(post.attributes.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }).toUpperCase(),
            title: post.attributes.title,
            excerpt: post.attributes.excerpt,
            slug: post.attributes.slug,
            featuredImage: this.getImageUrl(post.attributes.featuredImage),
            content: post.attributes.content,
            publishedAt: post.attributes.publishedAt
        }));
    }

    // Get single blog post by slug
    async getBlogPost(slug) {
        const data = await this.get(`/blog-posts?populate=*&filters[slug][$eq]=${slug}`);
        if (!data || data.length === 0) return null;

        const post = data[0];
        return {
            id: post.id,
            date: new Date(post.attributes.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }).toUpperCase(),
            title: post.attributes.title,
            excerpt: post.attributes.excerpt,
            slug: post.attributes.slug,
            featuredImage: this.getImageUrl(post.attributes.featuredImage),
            content: post.attributes.content,
            publishedAt: post.attributes.publishedAt
        };
    }

    // Get single project by id
    async getProject(id) {
        const data = await this.get(`/projects/${id}?populate=*`);
        if (!data) return null;

        return {
            id: data.id,
            title: data.attributes.title,
            description: data.attributes.description,
            longDescription: data.attributes.longDescription,
            image: this.getImageUrl(data.attributes.image),
            gallery: data.attributes.gallery?.data?.map(img => this.getImageUrl({data: img})) || [],
            techStack: data.attributes.techStack || [],
            liveUrl: data.attributes.liveUrl,
            githubUrl: data.attributes.githubUrl,
            featured: data.attributes.featured || false,
            challenges: data.attributes.challenges,
            solutions: data.attributes.solutions,
            features: data.attributes.features || []
        };
    }

    // Contact Form Submission
    async submitContact(formData) {
        return await this.post('/contacts', {
            name: formData.name,
            email: formData.email,
            message: formData.message,
            submittedAt: new Date().toISOString()
        });
    }
}

export default new StrapiAPI();