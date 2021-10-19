import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar';
import Footer from './Footer';
//import post1 from './blog-post.1.md';
//import post2 from './blog-post.2.md';
//import post3 from './blog-post.3.md';
//import robopic from './robot stonk.jpg';

const sections = [
  { title: 'Sign In', url: '#' },
  { title: 'Dashboard', url: '#' },
  { title: '', url: '#' },
  { title: '', url: '#' },
  { title: '', url: '#' },
  { title: '', url: '#' },
  { title: '', url: '#' },
  { title: '', url: '#' },
  { title: '', url: '#' },
  { title: '', url: '#' },
];

const mainFeaturedPost = {
  title: 'Stay In the Game',
  description:
    "A stock trading web app that uses bots to determine if you should buy, sell, or hold.",
  image: './robot stonk.jpg',
  imageText: 'Stock Trading Robot',
  linkText: 'Check out an Example',
};

const featuredPosts = [
  {
    title: 'Subscription Tiers',
    date: 'What We Offer',
    description:
      'We offer three subscrption tiers. Ranging from 3 to 10 bots.',
    image: 'https://source.unsplash.com/random',
    imageLabel: 'Image Text',
  },
  {
    title: 'Current Stocks We Offer',
    date: 'What We Offer',
    description:
      'We offer a wide variety of stocks to watch.',
    image: 'https://source.unsplash.com/random',
    imageLabel: '',
  },
];

const posts: readonly string[] = [];

const sidebar = {
  title: 'About',
  description:
    'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  archives: [
    { title: '', url: '#' },
    { title: '', url: '#' },
    { title: '', url: '#' },
    { title: '', url: '#' },
    { title: '', url: '#' },
    { title: '', url: '#' },
    { title: '', url: '#' },
    { title: '', url: '#' },
    { title: '', url: '#' },
    { title: '', url: '#' },
    { title: '', url: '#' },
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};

const theme = createTheme();

export default function Blog() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Stay In The Game Home" sections={sections} />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} sx={{ mt: 3 }}>
            <Main title="Why You Should Use Our Web App" posts={posts} />
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />
          </Grid>
        </main>
      </Container>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </ThemeProvider>
  );
}