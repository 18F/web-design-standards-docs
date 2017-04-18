---
title: Web performance glossary
permalink: /performance/glossary/
category: Getting started
layout: styleguide
lead: Detailed information about performance methods and metrics.
---

## Types of metrics

Discussion of web metrics requires splitting up metrics into different classifications. These are split into levels of direct metrics and indirect metrics. Direct metrics are more directly related to the user’s perception of performance, while indirect metrics affect the direct metrics.

<a name="direct-metrics"></a>
### Direct metrics

Direct metrics are ones that measure the user’s experience of the site, most often through timed measurements of this experience (except for speed index which is a number related to time). You can use direct metrics to: track a live site, help diagnose problems, and indicate how users are experiencing the site.

<a name="primary-direct-metrics"></a>
#### Primary direct metrics

The best direct metrics most accurately measure the user’s experience with the site, and are called primary direct metrics. The following primary direct metrics do a good job of measuring the user’s actual experience rather than a best guess at their experience. They are:

- [Custom timing events](#custom-timing-events)
- [Speed index](#speed-index)
- [Meaningful first paint](#meaningful-first-paint)
- [Time to interactive](#time-to-interactive)
- [Input latency](#input-latency)

<a name="secondary-direct-metrics"></a>
#### Secondary direct metrics

Secondary direct metrics drill down into the specific pieces that make up the whole user experience. They help link the problem to the experience and with the performance in general. Secondary direct metrics to potentially use are:

- [Render start](#render-start)
- [First paint](#first-paint)
- Total backend time or time to [first byte](#first-byte)
- [Onload](#onload)

<a name="indirect-metrics"></a>
### Indirect metrics

Indirect metrics explain the specific technical reasons for performance problems on a site. They’re not measured in time, but rather measurements that affect time. Indirect metrics can be passed to a development or design team as guidance when building a mockup or feature. They allow the team to build a UI with an indication of how it will perform.

Changes in indirect metrics *can* have an effect on direct metrics but won't always. For instance, there are performance improvements, such as critical CSS, that can improve direct metrics but will have no effect (or even negative effects) on indirect metrics. It's important to use indirect metrics only as an explanation for what's seen with direct metrics.

<a name="primary-indirect-metrics"></a>
#### Primary indirect metrics

The primary indirect metrics are the main metrics that affect page performance. While not a perfect indicator of site speed, they tie closely to the direct metrics so a designer or developer will have an idea of the user’s perceived performance when one of the primary indirect metrics changes. The primary indirect metrics to track are:

- [Number of requests](#number-of-requests)
- [Total size (kb, mb) of requests or page weight](#total-page-weight)
- [DOM weight or total DOM nodes](#dom-nodes)


<a name="secondary-indirect-metrics"></a>
#### Secondary indirect metrics

Secondary indirect metrics are used for diagnosing performance problems or checking that the website doesn’t have any obvious performance anti-patterns. Some of them, such as DNS requests, can be used as a checklist to ensure the site doesn’t go over a normal amount. Others, such as number of DOM elements, can help identify a hard-to-find performance problem. Secondary indirect metrics are DNS requests, which can be used if the website architecture requires more than three different domains to be in use.

<a name="types-of-monitoring-methods"></a>
## Types of monitoring methods

Another important distinction in the various performance metrics is the different ways they can be monitored. The type of monitoring changes how and where certain metrics can be used, so will play into the decisions of choosing metrics.

<a name="real-time-monitoring"></a>
### Real time monitoring

Real time monitoring is measuring performance of actual users on the site. Custom events, render start, onload, backend, number of requests, number of DOM elements and DOM complete can all be monitored in real time. Speed index cannot because it takes too much time and resources to run on a user's machine.

Real time monitoring allows you to measure actual users' performance while they are interacting with the site, often in real time. This can illustrate specific performance issues and can give accurate information about people's performance across the world, on different devices, and on different network speeds. It requires a live site with enough traffic to yield statistically significant results.

Unless there's significant web traffic, over 200 unique users a day—or traffic based on actual users rather than just stakeholders—real time monitoring may suggest performance numbers that are not representative of the user. This means that  real time monitoring should be used only when the site has the type of traffic that’s expected when the site is live. 

Real time monitoring is also subject to various fluctuations and differences in performance numbers. For instance, if a part of your userbase's network is slow for a day, or many of your users are using the site on mobile phones because of a news update, then the performance numbers for that day will be off. This makes it potentially harder to tie code changes and releases to performance changes. It also makes it potentially more difficult to compare your site’s performance with a competitor/similar site as your site might have factors which affect performance that you don’t have control of, such as more global users or more mobile users. This means that the best use case for real time monitoring is to understand your user base. Real time monitoring should be used with caution when doing comparative analysis or tracking performance over time through code changes.

<a name="synthetic-monitoring"></a>
### Synthetic monitoring

Synthetic monitoring is testing a site’s performance in a simulated, fake, and consistent environment. This would be running a performance tool as part of the build, or using a tool to run automated ([webpagetest.org] https://www.webpagetest.org/) tests against a site. Speed index is the classic synthetic monitoring tool, perhaps because speed index can only be used in a simulated environment. While speed index cannot be used in a real time environment, any of the real time monitoring metrics can also be used in a synthetic environment. This means using custom events, render start, or number of requests can all be used in a synthetic environment.

Synthetic monitoring provides a relatively consistent control for tests, as the environment in which the tests run can be invariable, allowing you to isolate the performance changes. It’s a better tool for comparing your site’s performance against competitors or similar sites, as well as, monitoring the site’s performance consistently through code/design changes and releases. It can also be a great tool for testing small tweaks for performance.

While synthetic monitoring is the best way to receive consistent performance monitoring results, the results will never be 100% consistent for any timed measurements, such as custom events or speed index. Many factors, such as other tasks running on the testing computer and current network speed fluctuations, can affect performance. It’s important to remember this when using synthetic monitoring and to deter it by running enough tests to be statistically significant and/or to be skeptical about performance differences of less than 5%.

## Metrics and implementations

<a name="Onload"></a>
### Onload

The load event fires at the end of the document loading process. At this point,
all of the objects in the document are in the DOM, and all the images, scripts,
links and sub-frames have finished loading ([source](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onload)).


#### Pros

- Easy to calculate for most pages
- Can calculate in any environment, and on almost any browser

#### Cons

- Is not a valid metric for perceived user performance because the page might be full rendered and active before the onload event fires. For more information see ([Steve Souders, moving beyond window onload](https://www.stevesouders.com/blog/2013/05/13/moving-beyond-window-onload/)).

#### How to measure

Onload can be measured in the browser. The best way is to use a performance measure. This works in all browsers besides IE less than 10, and Safari

```
  function accurateMeasurement() {
    setTimeout(function() {
      win.performance.measure('navigationStart', 'loadEventEnd');
      var measure = window.performance.getEntriesByName('navigationStart');
      console.log('onload', measure[0]);
    }, 0);
  }
  window.addEventListener('load', accurateMeasurement);
```
Another, less accurate way, that will work in all browsers is to use the JavaScriptDate object.

```
\<script type="text/javascript">
  var onLoadStart = new Date().getTime();
  function crossBrowserMeasurement() {
    setTimeout(function() {
      var onLoadNow = new Date().getTime();
      var latency = onLoadNow - onLoadStart;
      console.log("onload " + latency);
    }, 0);
  }
  window.addEventListener('load', crossBrowserMeasurement);

</script>
</head>
<body>
```

This cross-browser method is not recommended, as it has the following limitations:

- The JavaScript Date object is not accurate enough at these levels of precision.
- It won't play nice with services that use window.performance measurements, so this data will have to be captured somehow.

<a name="speed-index"></a>
### Speed index

Speed index is a score for the visual completeness of the page—above the fold (what’s visible to the user)—over time. It uses video capture to calculate this score. Created by webpagetest.org, it's a score from 0 to infinity that somewhat maps to milliseconds of time for the page to be visible to the user. A lower score is better.

#### Pros

- Accurately measures user’s perceived performance.

#### Cons

- Requires a live URL to test or
- Requires a webpagetest.org instance or service

#### How to measure

##### Through webpagetest.org

1. Go to http://www.webpagetest.org/
2. Enter the live URL of the website to test
3. Click on the “Advanced options” dropdown
4. Set the “Number of tests” to be run to at least three. This can be modified based on difference in test results
5. Click “Start test”

##### Through speedcurve.com

Sign up for a paid ([Speed Curve account] (https://speedcurve.com/))

##### Through setting up a custom webpagetest.org instance

1. Set up a webpagetest ([AWS instance] (https://www.peterhedenskog.com/blog/2015/07/private-wpt-instance/))

2. Create a wpt.json file with the following

```
{
  "timeout": 200,
  "location": "ec2-us-west-1:Chrome"
}
```

3. Install the sitespeed.io npm module

```
npm install sitespeed.io
```

<a name="custom-timing-events"></a>
### Custom timing events

Custom metrics are millisecond or second timings of how long a specific feature takes to be visible to the user. It's a metric that you determine based on the UI of the project, rather than a metric that applies to any kind of  project. This metric is sometimes called 'hero image timing,' as companies often use the hero image, or large banner, on their site as the custom event to test.

The typical example of a custom metric is Twitter using a "time to first tweet." In this case, Twitter measures the time in milliseconds for the first tweet to appear to the user.

#### Pros

- Is very closely related to the organization's goals for the site
- Is good at testing user perceived performance, such as speed index, but does not require a live URL or complex testing setup

#### Cons

- Challenging to manage on a site where the object being timed changes often, such as a blog
- Hard to manage on sites with many different page templates.

#### How to measure

1. Pick an event to measure. The event will be more accurate if it includes an image.
2. Include a performance mark right after the HTML code with the event.

```
\<!-- important thing to measure -->
\<div>
  <img>
</div>
\<script>
  window.performance.mark(‘important after’)
</script>
```

3. Also mark the same performance mark on image load to ensure whatever happens latest is the actual measure

```
\<div>
  <img onload=”window.performance.mark(‘important image’);”/>
</div>
```

<a name="first-meaningful-paint"></a>
### First meaningful paint

First meaningful paint is a browser-supplied metric that specifies how long it takes for the most meaningful content to be fully rendered on the site. The metric watches all layout events as the page loads, filters by layout events for new layout objects, are above the page fold, and then accounts for web font loading. By using these heuristics, the metric is a relatively accurate measure of how long it takes the most important content on the site to fully render. This was confirmed by having first meaningful paint tested against speed index for a large number of sites. This metric is closely related to speed index, as both are accurate measurements of a user’s perceived performance.

#### Pros

- Similarly to speed index, it is a very accurate measurement of how the user perceives the performance of a site
- Does not require a complex testing setup or live URL

#### Cons

- Requires the Chrome browser to test

#### How to measure

First meaningful paint can be measured in one of two ways:

##### Chrome lighthouse tool

The Chrome plugin and CLI testing tool, Lighthouse, includes first meaningful paint as one of the metrics it tests. To test, run either the plugin on your site or run the CLI with correct options.

##### Chrome web browser metric

The first meaningful paint can be found in statistics in the Chrome browser.

<a name="#time-to-interactive"></a>
### Time to interactive

The time from when the website becomes complete enough for the user to interact with it. This metric can be calculated through the browser timings API, `domInteractive`, or through speed index timings that take into account things like web fonts and the main thread freeing up. The `domInteractive` event in the browser is an inaccurate measurement, as it accounts for all DOM, blocking script, and style requests to be complete, which can lead to a very large number, when the user was actually able to interact with the page faster. Instead, more complex implementations of the metric should be used, such as what’s provided by Google Chrome Lighthouse.

First interactive can be nicely paired with speed index or first meaningful paint, as both test when the page is visually complete, while first interactive tests when the page can be modified by the user. The purpose and the content of the site will determine which metric is more important, or could determine if first interactive is needed at all. For example, if the site is a content heavy site, such as a blog, then first interactive may not be necessary, as the user’s only interaction with the site is to read it.

#### Pros

- For some sites, interaction may be more important than everything visually appearing, meaning this is a very important metric
- Relatively easy to test through Lighthouse

#### Cons

- Might not help content heavy sites that don’t have interactive elements
- May not be possible to test in different browsers

#### How to measure

Time to first interactive can be measure in one of two ways:

##### Chrome lighthouse tool

The Chrome plugin and CLI testing tool, Lighthouse, includes first interactive as one of the metrics it tests. To test, run either the plugin on your site or run the CLI with correct options.

##### Chrome web browser metric

Time to interactive can be found in statistics in the Chrome browser.

<a name="input-latency"></a>
### Input latency

Input latency is the amount of time it takes for the app to respond to the users as they interact with it. It’s very different than the other metrics, as it doesn’t relate to the initial load and displaying of the page; it’s a metric that is constantly being tracked over time, as the user interacts with the site. Due to how input latency works, it’s often best served as a RUM metric, as it’s more accurate to gather information as real users are interacting with the site. That being said, it’s also possible to synthetically test for it. For more information see ([Google Chrome Lighthouse's input latency document](https://developers.google.com/web/tools/lighthouse/audits/estimated-input-latency)).

#### Pros

- Only metric that tests how the site responds over time as the user interacts

#### Cons

- Harder to quantify with the rest of metrics
- Hard to get an accurate measurement

#### How to measure

The only known way to test input latency right now is through Google Chrome Lighthouse. This tool is able to keep a watch on the browser thread to know when it’s free after a user clicks on or interacts with the site.

<a name="render-start"></a>
### Render start

Render start is the time from the first byte to when the browser draws the first pixel on the screen. It is a synthetic metric, as there’s no way to get the metric from the browser itself. It is closely related to first paint, although it's more accurate than first paint as it's accurately calculated through visual cues. It's also harder to test than first paint as it requires screen capturing. See ([webpagetest discussion](https://www.webpagetest.org/forums/showthread.php?tid=13265)) for more.

Render start tells how long it takes for blocking scripts, style sheets, or processes to complete before the browser can start rendering the page. It will point to problems in the request pipeline, such as not deferring or placing JavaScripts to the end of the document, or having too many CSS resources requested up front. It’s generally inferior to the more complete picture metrics, such as speed index and first meaningful paint.

#### Pros

- Is very accurate

#### Cons

- Requires complex testing setups such as webpagetest
- Doesn’t include larger picture, such as speed index and meaningful first paint

#### How to measure

Render start can be measured along with speed index through web page test or similar tools. For more information, see the speed index how to.

<a name="first-paint"></a>
### First paint

First paint is a browser-based metric, supplied through the user timing API and specifies the amount of time from first byte to the first pixel rendered. It is unfortunately inaccurate in different browser implementations and sometimes reports the event too early, before anything has been rendered to the screen. Due to these limitations, it should be used with care.

The main reason to use first paint over the more accurate render start, is its ability to easily be used in Realtime User Monitoring (RUM), as it’s available in most browsers.

#### Pros

- Can be used in RUM measuring
- Very easy to test

#### Cons

- Not accurate cross browser
- Randomly not accurate at all

#### How to measure

First paint can be found through the Navigation timing API for browsers that support it, such as the newest versions of Chrome, Firefox, Internet Explorer (IE). In IE, it can be found under `performance.timing` as `msFirstPaint`, ([more info from Microsoft](https://msdn.microsoft.com/en-us/library/ff974719(v=vs.85).aspx)). In Chrome it can be found in `window.chrome.loadTimes()` under `firstPaintTime` ([more info from Chrome](https://gist.github.com/acdha/a1fd7e91f8cd5c1f6916)). It’s also available in most testing tools.

<a name="first-byte"></a>
### First byte

First byte is from the time the first request went out from the browser to the server, to when the first byte from the server comes back in. It's measuring the time it takes the browser to respond, so it's sometimes called "backend time."

#### Pros

- Good way to find problems with backend system when related to performance
- Pretty easy to test, has availability in most testing tools

#### Cons

- Doesn't tell the big picture, like speed index or meaningful first paint
- Doesn't get into details of backend response, so might be better served by more backend-related tools rather than browsers

#### How to measure

First byte is available in the standardized Navigation Timing API for any browsers that support it. It’s under the `responseStart` event. It’s also available in most testing tools.

<a name="total-page-weight"></a>
### Total page weight

This metric, also called total requests, is an accrual of all the site's resources weight, in kb or mb of the page, including the HTMl of the page itself. It's useful for setting weight budgets on a site, which are easy to pass to developers and even designers. It doesn't always tell the whole story of performance, as it depends how you load the requests.

#### Pros

- Easy metric to understand at all points in the process, from design to development
- Easy to test
- Can be tested with RUM

#### Cons

- Doesn't tell the whole story of site performance, as it also matters how the resources are loaded

#### How to measure

Total resource weight can be calculated with the ([Resource timing API](https://developer.mozilla.org/en-US/docs/Web/API/Resource_Timing_API/Using_the_Resource_Timing_API)). It would require getting all resources with `performance.getEntriesByType("resource");`, and aggregating the `encodedBodySize` for each. It’s also available in most testing tools.

<a name="number-of-requests"></a>
### Number of requests

Number of requests is the total number the page makes while loading resources such as CSS, JS, fonts, images, etc. It gives a sense of how many resources the browser has to download, or the different requests it has to make. This metric is much less important when the site is served under HTTP/2 due to the new HTTP/2 spec not having limits to how many resources can be downloaded at once. If the site uses multiple domains to serve resources, it's important to consider this when measuring total number of requests, as different domains change how the browser can process these requests.

#### Pros

- Very easy to test

#### Cons

- Will become obsolete for any site served over HTTP/2
- Doesn't account for resources being served over multiple domains, so doesn't always tie to performance directly

#### How to measure

Total resource weight can be calculated with the ([Resource timing API](https://developer.mozilla.org/en-US/docs/Web/API/Resource_Timing_API/Using_the_Resource_Timing_API)). It would require getting all resources with `performance.getEntriesByType("resource");`, and aggregating them.

<a name="dom-nodes"></a>
### DOM Nodes

The DOM Nodes is the amount of HTML content on the page. It refers to how many elements or tags (h1, p, span, etc.) the page has. While DOM nodes doesn’t affect network performance, it affects the actual browser's performance. A browser will take a long time to parse, process, and render a page if it has more nodes.

When relating DOM nodes to performance, it’s usually more important for a high upper limit on nodes rather than continually try to improve the amount of nodes. This is because DOM nodes only become a problem for performance when there are a lot of them, upwards of 1,500. Removing a small number of DOM nodes from your site if there are already less than 1,500 won't have a noticeable affect on performance. DOM nodes also relates to input latency—if the browser has too many DOM nodes, it will not be able to keep up with the user’s interactions.

#### Pros

- Can be tested with RUM

#### Cons

- Reducing DOM nodes usually doesn’t have a large affect on performance

#### How to measure

Getting the number of DOM nodes is very easy, and can be done using the standards DOM JS API in all browsers: `document.getElementsByTagName('*').length`.

