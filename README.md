## Neopets DreamTheme ![](http://i.imgur.com/CaRRqQo.png)

Neopets DreamTheme is a Chrome extension that lets you use [any site theme you want](http://i.imgur.com/f6iIg8H.gif) on Neopets.

### Disclaimers
* I am not affiliated with Neopets.
* All Neopets images and CSS belong to Neopets.
* Using this extension to change your site theme will **not** grant you any of the perks associated with certain themes.
* This extension does **not** give you any kind of advantage over other players. All it does is customize the appearance of the site.

### Getting Started
* Close any Neopets tabs you have open.
* Download the packaged extension by going [here](https://docs.google.com/file/d/0B1epie81RPWlNWZ5TjhfZS1SUmM/) and clicking **Download**.
* Open the Extensions page in Chrome (Menu > Tools > Extensions). (Or Menu > Settings > Extensions.)
* Drag and drop **neo-dt.crx** onto that page, like so:  
![](http://i.imgur.com/FjcHC1F.png)

* Wait for the following dialog to appear (sometimes it takes a few seconds). Then click **Add**.  
![](http://i.imgur.com/Z3fVTHv.png)  
Permissions explained (since Chrome makes them sound scary when they actually aren't!):
    1. The extension needs to be able to interact with the HTML on all Neopets pages in order to display different themes. In no way does it have access to your password, PIN, or anything of that sort. If you're curious about what exactly is going on under the hood, check out [this script](https://github.com/AshleighC/neo-dt/blob/master/js/content.js), which is what runs on every page.
    2. The extension needs to access your tabs so that it knows whether to display the theme icon in your address bar, which is shown only on Neopets tabs. Check out [this script](https://github.com/AshleighC/neo-dt/blob/master/js/background.js) to see how it does this. If the tab url has ".neopets.com" in it, the icon is shown; if not, the icon is hidden. That's all this means!

* If all went well with the installation, you should see this message pop up.  
![](http://i.imgur.com/GB1YkZi.png)

* You're all set! Open a new tab and go to Neopets. Or click <a href="http://www.neopets.com/" target="_blank">here</a>.

### Usage
* You should see an icon on the right side of the address bar, next to the bookmark icon. (If you don't see it, try refreshing the page.) It should look something like this:  
![](http://i.imgur.com/sPJuQF0.png)  
The actual icon you see might be different because it reflects whichever theme you currently have selected.

* Click on the icon to bring up the control panel. Then click on any theme to set it as your site theme! :)  
![](http://i.imgur.com/VdgJHaf.png)

### Coming Soon
* Ability to enable/disable the top banner
* Compatibility with Adblock
