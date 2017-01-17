A sane-sart counter, shareable between sites

# Usage

To embed the counter in your site, just add this tag to a page:

`<script src="https://cdn.rawgit.com/dleetinc/sanesartcounter/366d615f/sane-sart-counter.js"></script>`

The `src` above is for github's cdn service. You might use a local version as well. 

# Options

Just dropping the script tag above in a page is enough to have the widget added as a floting, fixed position, div with the counter. There's an "inline" version too, i.e, a div that will be embeded inside an element. To use it, insert these script tags inside any element of your page: 

`<script>WIDGET.theme = 'inline';</script>
<script src="https://cdn.rawgit.com/dleetinc/sanesartcounter/366d615f/sane-sart-counter.js"></script>`

# Developer Options

The widget retrieve CSS and images from GitHub's CDN. If you want to use local resources, do this:

`<script>WIDGET.base_url = 'http://path-to-your-files/'</script>`

