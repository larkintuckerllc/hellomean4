This "Hello Word" app is the fourth effort at learning the basics of the MEAN application stack. The goal here was to wrap-up the error handling, add in LinkedIn authentication / authorization, and porting into a test environment.

_Error Handling_

As usual, the error handling code in the client ends up more than doubling up the code, e.g., havng to handle permission (403), input error (400), and any other unexpected error (500). 

In working through the error handling, I realized that I had to better control the user's interactions at critical points in the application.

I first disabled the address bar navigation and provided a "blessed" method of navigation to routes using the navigation.js service.

Second, I used angular-block-ui to prevent accidental clicks on UI elements when the app is performing updates and deletes.

McNull/anular-block-ui
<https://github.com/McNull/angular-block-ui> 

_LinkedIn Authentication / Authorization_

For LinkedIn authentication, I used simple-oauth2 on the server to work with the LinkedIn OAuth 2.0 interface. I designed the client so that logging in stores the OAuth 2.0 token in the browsers HTML5 web storage to allow one to stay logged in for a long period. Also to prevent repeated token validations to LinkedIn, I cache the credentials on the server to be cleaned out daily by a cron job.

andreareginato/simple-oauth2
<https://github.com/andreareginato/simple-oauth2>

_Porting to Test Environment_

Turns out running node securely as a daemon is tougher than I had originaly thought.

The trick ended up being:

Using iptables to do a NAT translation of incoming traffic to route port 80 to port 3000.  This allowed me to run the node application with an unpriviliged account, e.g., node.

Second, used a node application called forever that converted the inheritly user-centric application into a daemon.

nodejitsu/forever
<https://github.com/nodejitsu/forever>
