
const colors = {
    HTML: '#e34c26',
    CSS: '#563d7c',
    JavaScript: '#f1e05a',
    Go: '#00add8',
};
async function displayLanguages(projectEl) {
    const repo = projectEl.dataset.repo;
    const resp = await fetch(`https://api.github.com/repos/0abdelilah/${repo}/languages`);
    const languages = await resp.json();

    if (languages.length > 4) {
        languages = languages.slice(0, 4);
    }

    const total = Object.values(languages).reduce((a, b) => a + b, 0);
    const html = Object.entries(languages).map(([lang, val]) => {
        const percent = ((val / total) * 100).toFixed(1);
        const color = colors[lang] || '#999';
        return `<div class="language">
    <span class="dot" style="background: ${color};"></span> ${lang}
    <span class="percent">${percent}%</span>
  </div>`;
    }).join('');

    projectEl.querySelector('.languages').innerHTML = html;
}


document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.project').forEach(project => {
        displayLanguages(project);
    });
});
