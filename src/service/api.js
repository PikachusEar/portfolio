// src/services/api.js
class StrapiAPI {
    constructor() {
        this.baseURL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
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
            throw error;
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

    // Hero Section Data
    async getHero() {
        return await this.get('/hero?populate=*');
    }

    // About Section Data
    async getAbout() {
        return await this.get('/about?populate=*');
    }

    // Experience Data
    async getExperiences() {
        const data = await this.get('/experiences?populate=*&sort=startDate:desc');
        return data.map(exp => ({
            title: exp.attributes.title,
            company: exp.attributes.company,
            period: exp.attributes.period,
            description: exp.attributes.description
        }));
    }

    // Projects Data
    async getProjects() {
        const data = await this.get('/projects?populate=*&sort=order:asc');
        return data.map(project => ({
            id: project.id,
            title: project.attributes.title,
            description: project.attributes.description,
            image: project.attributes.image?.data?.attributes?.url,
            techStack: project.attributes.techStack || [],
            liveUrl: project.attributes.liveUrl,
            githubUrl: project.attributes.githubUrl
        }));
    }

    // Skills Data
    async getSkills() {
        const data = await this.get('/skill-categories?populate=*&sort=order:asc');
        return data.map(category => ({
            category: category.attributes.name,
            skills: category.attributes.skills.map(skill => skill.name)
        }));
    }

    // Blog Posts Data
    async getBlogPosts() {
        const data = await this.get('/blog-posts?populate=*&sort=publishedAt:desc');
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
            featuredImage: post.attributes.featuredImage?.data?.attributes?.url
        }));
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

    // Fetch All Portfolio Data
    async getPortfolioData() {
        try {
            const [hero, about, experiences, projects, skills, blogPosts] = await Promise.all([
                this.getHero(),
                this.getAbout(),
                this.getExperiences(),
                this.getProjects(),
                this.getSkills(),
                this.getBlogPosts()
            ]);

            return {
                hero,
                about,
                experiences,
                projects,
                skills,
                blogPosts
            };
        } catch (error) {
            console.error('Failed to fetch portfolio data:', error);
            throw error;
        }
    }
}

export default new StrapiAPI();