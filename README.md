# Explination of This Implementation

This is just a prototype, so I wrote it in ***fully*** native ES6 ESM without a transpiler or bundler. I also used my `strong-type` isomorphic node module. It uses `private class methods and members` which means for firefox you would need to set ***both the private class definition ES6 flags to true*** in FF. Had I not used that node module in the browser natively, it would run fine in FF as well.

So for this example, please just run the code in Chrome, Edge, Opera, Vivaldi, Brave, or any other modern chromium-based browser flavor of the day you happen to have installed. Unless you want to set the flags in firefox for js private class fields.

![Private JS field support](https://i.imgur.com/AGkxd8P.png)

After cloning the repo, make sure to put in your **test** credentials in the `/creds/credentials.js` file. Also, your `Origin Key` will need to be set for `localhost:8080` to allow the cross-domain CORS to work with Adyen's servers. I set up my Origin Key using the [Curl API request](https://docs.adyen.com/development-resources/how-to-get-an-origin-key#363494807) because I did not have a username and password to log into the back end system. The request works equally well for one domain as it does for multiple, so don't worry about the title of that section.

Once you have your credentials setup per Adyen's docs and put them into the `credentials.js` file, run `npm start` from the root of this repo. This will automatically install all the required dependencies, as well as copy the `adyen-web` and `strong-type` node modules into the public `/www/` dir for use in the browser as native ESM. I only copy the modules I want to be publicly accessible to this dir. Then the `node-http-server` will start automatically for you in verbose mode so you can see the requests coming in.

When the server is up and running, go to [the local test site](http://localhost:8080/)

![Adyen test payment page](https://i.imgur.com/UY8eiZ5.png)

***I only implemented `iDeal`*** fully for the simplicity's sake of this example/test. Other implementation would require the `additionalPaymentDetails` API method to be implemented. Once completing the `iDeal` payment, you will be taken to Adyen's servers to review the simulated transaction.

![iDeal simulation page](https://i.imgur.com/RNEiiYa.png)

After you hit `continue` you will be sent back to the test server `checkout.html` page. This page will populate a table with the information returned from Adyen's simulation server and force a `success` example in the Adyen drop-in. This is not fully production code but does serve to give an end to end prototype example. With a little more work, it could become a fully integrated prod ready set of code. And of course, if you wanted it to run on any browser, including the new IE6 (Safari and iOS), you would integrate this code with a transpiler and bundler because it is fully native ESM at the moment.

If you just wanted it to work in all modern standards-compliant browsers, you could just remove the depndancy on `strong-type` as it is the only thing using js class private fields.

![checkout complete page](https://i.imgur.com/v6y9x7D.png)

  

# Overall Experience

![I did not like it](http://www.reactiongifs.com/r/jck.gif)

While I feel there is a lot of room to grow, I was able to get things working because the core information was present in the docs. I did however have to infer a lot of how to handle things because the docs were inaccurate or incomplete. A certain amount of trial and error was required.

Many things were completely undocumented but were clear enough for a sr/lead dev in the context of the application, and many things needed to be inferred based on that context as well. None the less this should all be documented thoroughly, and in such a way that both Jr and mid level devs can understand it, ***OR*** automated so Jr/Mid-level devs need not concern themselves with the minutia until they grow in skill. At which point hooks into the Adyen process could be used, or when skills are sufficiently advanced a more helpful but fully customizable integration as Adyen has tried to do here could be used.

# Issues with Adyen Modules/Libraries and Documentation

* None of the transpiled modules work in a standards-compliant way with ES6.

* Adyen Docs show the modules working as standards-compliant.
Adyen should either fix code to be standards compliant for users OR properly document the non-standard implementation.

* Adyen docs are not consistent and leave out many important examples and facts.

* The user is required to read in-depth how the Adyen tooling works and figure out what to do by deciphering the examples and what they are missing from the surrounding documentation and description. This is fine for a Sr. or lead level dev but would be nearly impossible for a mid to jr level.

* The documentation gives the impression that it is a follow-along guide, however, it is missing steps, provides incorrect examples, and poor descriptions of what and how to make the Adyen tooling work.

* Overall this gives a poor developer experience and feels unfinished and not ready for production documentation. It is a great start, but does not need to be this difficult. 

# Take Away

Simply due to its documentation, I believe many devs will run away from Adyen, not because it is not well made or buggy. I believe it is done quite well and seems super reliable. I believe many devs will run because at first pass the code does not work as documented, and the documentation is overly complex, incomplete, and unintuitive.

I strongly believe that if Adyen was to address these issues, their developer adoption rate would increase dramatically. I find development and architecture to be an art form and so am willing to look deeper at solutions, but I would say more and more now, developers do not take pride in their work, and so just want the fastest, least brain taxing solution possible. I would expect a mindset of: "If a "drop-in" is this complex, certainly the non-drop-in must be even ***more*** complex." 

![frightningly complex for most](http://www.reactiongifs.com/r/rms.gif)

# Suggested Goals for Adyen

From the moment a dev starts to write their first line of code, prototyping the entire end to end drop-in process should take :

|dev|time to prototype|
|-|-|
|Jr|< 3 hours|
|Mid| < 2 hours|
|Sr.| < 1 hour |
|Lead| 30 min or less| 

Making fully production-ready code will vary depending on the company's needs, tooling, and infrastructure. However, prototyping is the first place to win a devs heart, but it is very time-sensitive. Consider the fact that some devs drink soylent because it is more efficient and time-saving than making real food and taking the time to eat that real food.
