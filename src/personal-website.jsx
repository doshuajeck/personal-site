
import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Mail, ExternalLink, Calendar, Tag, ArrowRight, Code, Palette, User } from 'lucide-react';
import './tailwind.css';

export default function PersonalWebsite() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [blogPosts, setBlogPosts] = useState([]);
  const [blogLoading, setBlogLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load blog posts from text files
  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        // List of blog files to load
        // You can either hardcode these or use a manifest file
        const blogFiles = [
          'post1.txt',
          'post2.txt',
          'post3.txt'
        ];

        const posts = [];
        
        for (const file of blogFiles) {
          try {
            const response = await fetch(`./blog/${file}`);
            if (response.ok) {
              const content = await response.text();
              const post = parseBlogPost(content);
              if (post) {
                posts.push(post);
              }
            }
          } catch (error) {
            console.error(`Error loading blog post ${file}:`, error);
          }
        }

        // Sort by date (newest first)
        posts.sort((a, b) => new Date(b.date) - new Date(a.date));
        setBlogPosts(posts);
      } catch (error) {
        console.error('Error loading blog posts:', error);
      } finally {
        setBlogLoading(false);
      }
    };

    loadBlogPosts();
  }, []);

  // Parse blog post from text file with |.| delimiter
  const parseBlogPost = (content) => {
    try {
      const lines = content.split('\n');
      const post = {};
      
      for (const line of lines) {
        if (line.includes('|.|')) {
          const [key, value] = line.split('|.|').map(s => s.trim());
          
          if (key === 'id') {
            post.id = parseInt(value) || value;
          } else if (key === 'tags') {
            // Parse tags as comma-separated values
            post.tags = value.split(',').map(tag => tag.trim());
          } else {
            post[key] = value;
          }
        }
      }
      
      // Validate required fields
      if (post.id && post.title && post.excerpt && post.date) {
        return post;
      }
      
      return null;
    } catch (error) {
      console.error('Error parsing blog post:', error);
      return null;
    }
  };

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Sample portfolio items
  const portfolioItems = [
    {
      id: 1,
      title: "Goomba",
      type: "image",
      thumbnail: `./portfolio/goomba.jpg`,
      description: "Created with Blender"
    },
    {
      id: 2,
      title: "Life Flask",
      type: "video",
      thumbnail: `./portfolio/flask.jpg`,
      description: "Created with Blender"
    },
    {
      id: 3,
      title: "Mage Staff",
      type: "image",
      thumbnail: `./portfolio/staff.jpg`,
      description: "Created with Blender"
    },
    {
      id: 4,
      title: "Neighbor",
      type: "image",
      thumbnail: `./portfolio/neighbor.jpg`,
      description: "Created with Blender"
    }
  ];

  // Sample projects
  const projects = [
    {
      id: 1,
      title: "GronkBot",
      description: "A Rocket League AI using the RLBot framework",
      tech: ["Python", "RLBot"],
      github: "https://github.com/doshuajeck/GronkBot",
      demo: null
    },
    {
      id: 2,
      title: "Tinkering Turrets",
      description: "A small Unity prototype experimenting with dynamic AI",
      tech: ["Unity2D", "C#"],
      github: "https://github.com/doshuajeck/Tinkering-Turrets",
      demo: "https://mochiigato.itch.io/tinkeringturretsdemo"
    },
    {
      id: 3,
      title: "Contiguous Allocator",
      description: "A C implementation of a contiguous memory allocator",
      tech: ["C"],
      github: "https://github.com/doshuajeck/ContiguousAllocator",
      demo: null
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-slate-950/95 backdrop-blur-lg shadow-lg shadow-teal-500/10' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
                Mochi Network
              </h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {['home', 'about', 'blog', 'projects', 'art'].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`capitalize px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                      activeSection === section
                        ? 'text-teal-400 bg-teal-400/10'
                        : 'text-slate-300 hover:text-teal-400 hover:bg-teal-400/5'
                    }`}
                  >
                    {section}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-300 hover:text-teal-400 transition-colors"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-950/98 backdrop-blur-lg border-t border-teal-500/20">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {['home', 'about', 'blog', 'projects', 'art'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all ${
                    activeSection === section
                      ? 'text-teal-400 bg-teal-400/10'
                      : 'text-slate-300 hover:text-teal-400 hover:bg-teal-400/5'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Home Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-transparent to-cyan-500/10"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(50, 168, 158, 0.15) 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, rgba(34, 211, 238, 0.15) 0%, transparent 50%)`
        }}></div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight">
              <span className="block text-slate-100">Creative Solutions</span>
              <span className="block bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                & Artistic Advocacy
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Crafting ethically-conscious designs in an increasingly unethical space
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-8">
              <button
                onClick={() => scrollToSection('projects')}
                className="group px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg font-medium hover:shadow-lg hover:shadow-teal-500/50 transition-all duration-300 flex items-center gap-2"
              >
                View Projects
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="px-8 py-4 border-2 border-teal-400/50 rounded-lg font-medium hover:bg-teal-400/10 hover:border-teal-400 transition-all duration-300"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen py-24 relative bg-slate-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <p className="text-xl text-slate-400">Developer, designer, and creative technologist</p>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-8 lg:p-12">
            <div className="space-y-6 text-slate-300 leading-relaxed text-lg">
              <p>
                Hello! I am a programmer by trade, not an artist. Despite my lack of artistic talent, I find
                myself enamored with the creative process and have tried throughout my entire life to capture that
                essence. As a fledgeling programmer, I fell in love with building software applications and the 
                design that came with them. 
              </p>
              <p>
                As I grew as a software developer, I found niches within the industry that allowed for artistic
                ability to be honed. I practiced design through video game development, aesthetic design through
                web development, and have recently taken up 3D art as a hobby. In 2026, however, these two things
                are increasingly at odds.
              </p>
              <p>
                It is my philosophy that the arts are extremely important, and that we should maintain a strict
                ethical code when encroaching on the art ecosystem. A balance of tech with art is what makes
                software interesting to me, and I firmly believe that automating art would be a significant
                loss for humanity. 
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-12 pt-12 border-t border-slate-800">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-500/10 rounded-full mb-4">
                  <Code size={28} className="text-teal-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-100 mb-2">Development</h3>
                <p className="text-slate-400">Technical expertise with modern frameworks and tools</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-500/10 rounded-full mb-4">
                  <Palette size={28} className="text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-100 mb-2">Design</h3>
                <p className="text-slate-400">Composing beautiful and aesthetic interfaces</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-500/10 rounded-full mb-4">
                  <User size={28} className="text-teal-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-100 mb-2">Creative</h3>
                <p className="text-slate-400">Exploring digital art and interactive media</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="min-h-screen py-24 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Blog & Articles
            </h2>
            <p className="text-xl text-slate-400">My thoughts on a variety of subjects</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogLoading ? (
              <div className="col-span-full text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-teal-500/20 border-t-teal-500"></div>
                <p className="mt-4 text-slate-400">Loading blog posts...</p>
              </div>
            ) : blogPosts.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-slate-400">No blog posts found. Add .txt files to the /blog directory.</p>
              </div>
            ) : (
              blogPosts.map((post, index) => (
              <article
                key={post.id}
                className="group bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl overflow-hidden hover:border-teal-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/20"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3 text-sm text-slate-500">
                    <Calendar size={16} />
                    <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-100 group-hover:text-teal-400 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-slate-400 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 pt-2">
                    {post.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="flex items-center gap-1 px-3 py-1 bg-teal-500/10 text-teal-400 rounded-full text-sm"
                      >
                        <Tag size={14} />
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <button className="group/btn flex items-center gap-2 text-teal-400 font-medium pt-2 hover:gap-3 transition-all">
                    Read More
                    <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </article>
            )))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen py-24 relative bg-slate-900/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Technical Projects
            </h2>
            <p className="text-xl text-slate-400">Development work and technical implementations</p>
          </div>

          <div className="space-y-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="group bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-8 hover:border-teal-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/20"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="flex-1 space-y-4">
                    <h3 className="text-2xl font-bold text-slate-100 group-hover:text-teal-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-teal-500/10 text-teal-400 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                    >
                      <Github size={18} />
                      <span className="text-sm font-medium">Code</span>
                    </a>
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-teal-500 hover:bg-teal-600 rounded-lg transition-colors"
                      >
                        <ExternalLink size={18} />
                        <span className="text-sm font-medium">Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Art Section */}
      <section id="art" className="min-h-screen py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Creative Works
            </h2>
            <p className="text-xl text-slate-400">Artistic projects and other visual works</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {portfolioItems.map((item, index) => (
              <div
                key={item.id}
                className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300"></div>
                <div className="absolute inset-0 flex flex-col justify-end p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950/90 border-t border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-400 text-sm">
              © 2026 Mochi Network. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="https://github.com/doshuajeck"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-teal-400 transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>              
              <a
                href="mailto:contact@mochinetwork.net"
                className="text-slate-400 hover:text-teal-400 transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        
        * {
          font-family: 'Space Grotesk', system-ui, -apple-system, sans-serif;
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        ::-webkit-scrollbar {
          width: 10px;
        }
        
        ::-webkit-scrollbar-track {
          background: #0f172a;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #32a89e;
          border-radius: 5px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #41c7ba;
        }
      `}</style>
    </div>
  );
}