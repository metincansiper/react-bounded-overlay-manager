import ghpages from 'gh-pages';

ghpages.publish('storybook-static', { nojekyll: true }, (err) => {
  if (err) console.log('Deployment Error:', err);
  else console.log('Deployed Successfully!');
});
