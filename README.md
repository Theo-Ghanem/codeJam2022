# McGill CodeJam2022
Interactive Chrome extension built with react and typescript.
***
## Inspiration
The biggest difficulty for businesses, especially small ones, is to grow their brand awareness and keep their audiences engaged. With the various social media platforms that exist and the growing need to advertise/have a presence on all of the it can be hard to keep track of how well your business is doing online. Social Mojo aims to ease this difficulty by keeping all of the important information on how your brand is doing in one compact chrome extension that is always accessible.

## What it does
Social Mojo is a chrome extension that allows businesses or individuals to view their social media presence. It will give key insights such as post impressions, impressions over time, facebook post engagement, instagram impressions and reach. Finally it will categorize instagram and facebook comments about your company to get a live rating of the general populations opinions. 

## How we built it
For the front end:
- Chrome extension 
- React
- Typescript

For the back end:
- Trained a tensorflow model for sentiment analysis
- Hosted tensorflow model on google-colaboratory with a Flask backend
- Hosted main api on AWS serverless (Lambda and ApiGateway) using Node.js which talked to our Flask and Facebook/Instagram APIs

## Challenges we ran into
- Geting tensorflow model to converge
- Finding a place to host our specific tensorflow version model
- Getting react to work with a chrome extensions
- Making graphs in typescript

## Accomplishments that we're proud of
- Learning Flask
- Training custom tensorflow model
- Getting a chrome extension to work
- Working with scripts a lot

## What we learned
- How to better integrate front-end and back-end technologies
- The (un)importance of sleep

## What's next for Social Mojo
We would like to add other social media capabilities such as twitter, linkedin, reddit, etc. to be able to give a full view of your company's online presence.

## The team
- Sehr Moosabhoy
- Sabrina Mansour
- Ryan Reszetnik
- Theo Ghanem
***
## Video demo link
https://youtu.be/2ha0mmli_i4
