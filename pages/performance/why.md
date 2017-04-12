---
title: Why track performance
permalink: /performance/why/
category: Getting started
layout: styleguide
lead: Performance is an important part of user experience that shouldn’t go unnoticed [need better intro].
---

## Conversion rate

Conversion is the rate at which customers of a website product who take a desired action The desired action depends on the website project's goals and purpose. The conversion action for an e-commerce site is often a user completing a purchase, but public sector sites that don't sell anything can also use the idea of conversion. For example, the IRS site's conversion action could be when somebody successfully submits their tax returns, or the Federal Election Commisions conversion action could be when somebody successfully finds data they were looking for.

Performance has been known to be an influencing factor when it comes to the conversion rate for a site. Regardless of the user interface and it’s purpose, multiple studies have shown that improving performance consistently improves conversion rates over a wide range of applications. According to [surveys done by Akamai](https://www.akamai.com/us/en/about/news/press/2009-press/akamai-reveals-2-seconds-as-the-new-threshold-of-acceptability-for-ecommerce-web-page-response-times.jsp), nearly half of web users expect a site to load in 2 seconds or less, and they tend to abandon a site that isn’t loaded within 3 seconds. This mean that even a relatively fast site may be losing conversion due to speed. There are real-world examples of how performance can effect conversion such as:

- [Google found out that slowing search results by just 4/10ths of a second would reduce the number of searches by 8,000,000 per day](http://www.getelastic.com/site-speed-infographic/)
- [At Walmart, for every 1 second of improvement they experienced up to a 2% increase in conversions](http://www.webperformancetoday.com/2012/02/28/4-awesome-slides-showing-how-page-speed-correlates-to-business-metrics-at-walmart-com/)
- [Amazon’s calculated that a page load slowdown of just one second could cost it $1.6 billion in sales each year](https://www.fastcompany.com/1825005/how-one-second-could-cost-amazon-16-billion-sales)

How fast a site loads is often the first indication of what a web experience will be like to a user, and a slow loading site can cause a loser to quickly loose trust and patience with a website.

## Factors of performance

A common excuse for not tracking web performance on a team, is that the site appears fast enough for the team to use. This ignores a couple of important factors of what a user might be experiencing in terms of performance. A site’s performance depends on factors like current network speed, physical distance between client and server, computing capacity of the current device, etc. At 18F currently, most people working on the sites being built are working on fast laptops, on wired or relatively fast connections within the United States. These factors are all conducive to good performance.

A user on the site could instead be on a mobile device and mobile network, or on a computer outside of the United States or on a network that is congested or just plain slow. Being on a network outside of the US alone could mean an extra 150 milliseconds in round trip time to the server due the longer distance the signal has to travel, meaning seconds more time in loading a page. While wired and wifi networks provide relatively consistent performnace, mobile networks can rapidly change from fast 4G connections to slow 3G connections to periods of being unconnected. Smaller decives, such as mobile phones, and older devices don't have as much CPU power to quickly download and process multiple resources. By limiting the measurement of the performance of a site to just a user’s perception on a fast connection and device, a huge amount of the site’s user base could be left with a site that’s very difficult to use and interact with due to poor performance.

## Perception of performance

Studies have shown that users perceive differences in speed of a UI [when it changes by a ratio of 20%](https://www.sitepoint.com/the-perception-of-performance/). To put it more simply, if a website wants to create a difference in speed that is noticable to it's user's, it shoudl perform at least 20% faster then previously. Changes in less than 20% are usually not as perceptible. This means that 20% is somewhat of a “golden number” when working with performance.

## Measurement of performance

It’s been shown why performance itself is important, but what does measuring it do? Measuring performance ensures the team:

- is aware of it’s importance so it doesn’t degrade.
- has a sense about what code or design changes cause what performance differences, making prioritization and design decisions easier.
- understands what the users of the sites true experience is, not just the ideal experience on a fast device and network.
- has a sense of what features they can build while designing to stay within performance budgets, ensuring performance problems don’t even come up during the site’s development.

