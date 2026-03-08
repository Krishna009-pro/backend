export function pageNotFound(req, res) {
    res.status(404).render('404', {
        currentPage: "404",
        PageTitle: "Page Not Found"
    });
}
