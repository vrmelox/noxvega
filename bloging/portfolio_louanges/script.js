const articlesInfo = [];
async function loadArticles() {
    try {
        const response = await fetch('articles.json');
        const filesArticle = await response.json();

        for (const file of filesArticle) {
            const fileResponse = await fetch(file);
            if (fileResponse.ok) {
                const content = await fileResponse.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(content, 'text/html');
                const title = doc.querySelector('h1').textContent;
                const image = doc.querySelector('img').src;
                const excerpt = doc.querySelector('.excerpt').textContent;
                const contenu = doc.querySelector('.article-main').textContent;
                const category = doc.querySelector('.category').textContent;
                let post = doc.querySelector('article');
                let postlink = post.classList[0];
                const articlelink = `/articles/${postlink}.html`;

                articlesInfo.push({
                    title: title,
                    image: image,
                    excerpt: excerpt,
                    contenu: contenu,
                    category: category,
                    postlink: articlelink
                });
            }
        }
    }catch (error) {
        console.error('Erreur lors du chargement des fichiers :', error);
      };
};

function blogFiler () {
    const categoryUl = document.querySelector('.category ul');
    
    const categories = [...new Set(articlesInfo.map(article => article.category))];
    for (let i = 0; i < categories.length; i++) {
        const newCatgory = document.createElement('li');
        newCatgory.textContent = categories[i];
        categoryUl.appendChild(newCatgory);
    };
}

function categoryFilter(articles) {
    const categoryLi = document.querySelectorAll('.category ul li');
    let filteredArticles = articles;
            categoryLi.forEach(li => {
                li.addEventListener('click', function() {
                    const selectedCategory = li.textContent.trim();

                    if (selectedCategory === "Voir tout") {
                        filteredArticles = articles;
                    } else {
                       filteredArticles = articles.filter(article => article.category === selectedCategory);
                       console.log(filteredArticles);
                    }
                });
            });
            console.log(filteredArticles);
            return filteredArticles;
}

function AfficherArticles (articles) {
    const divArticles = document.querySelector('.les-articles');
    const articlesInfo = categoryFilter(articles);

    articlesInfo.forEach(article => {
        const title = document.createElement('h2');
        title.classList.add('title');
        const excerpt = document.createElement('p');
        excerpt.classList.add('excerpt');
        const category = document.createElement('p');
        const readMore = document.createElement('p');
        category.classList.add('cat');
        readMore.classList.add('readMore');

        const link = document.createElement('a');   
        link.href = article.postlink;

        title.textContent = article.title;
        excerpt.textContent = article.excerpt;
        category.textContent = article.category;
        const newArticle = document.createElement('section');
        const newDivImg = document.createElement('div');
        newDivImg.classList.add('img-hero');
        newDivImg.style.backgroundImage = `url(${article.image})`;
        newArticle.classList.add('article');
        link.textContent = 'Lire plus >';
        readMore.appendChild(link);

        newArticle.appendChild(newDivImg);
        newArticle.appendChild(category);
        newArticle.appendChild(title);
        newArticle.appendChild(excerpt);
        newArticle.appendChild(readMore);

        divArticles.appendChild(newArticle);
    });
}

async function main() {
    await loadArticles();
    blogFiler();
    AfficherArticles(articlesInfo);
}

main();