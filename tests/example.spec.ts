import 'dotenv/config';
import { test, expect } from '@playwright/test';

test('Test Get tags', async ({ request }) => {
  const tagsResponse = await request.get('https://conduit-api.bondaracademy.com/api/tags')
  const tagsResponseJSON = await tagsResponse.json();
  expect(tagsResponse.status()).toEqual(200);
  expect(tagsResponseJSON.tags[0]).toEqual('Test');
  console.log(tagsResponseJSON)

});

test('Get All Articles', async ({ request }) => {
  const articlesResponse = await request.get('https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0'); 

  const articlesResponseJSON = await articlesResponse.json();
  console.log(articlesResponseJSON)
  //expect(articlesResponseJSON.articles.length).toBeLessThan(10);
  expect(articlesResponse.status()).toEqual(200);
});


test('Create Article', async ({ request }) => {
const tokenResponse = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
  data: {
    user: {
      email: process.env.USER_EMAIL,
      password: process.env.USER_PASSWORD,
    }
  }
});
  const tokenResponseJSON = await tokenResponse.json();
  const authToken = 'Token ' + tokenResponseJSON.user.token;
  // console.log(authToken);

  const newArticleResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles', {
    data: {
      article: {
        title: 'Test Snow Tire 3',
        description: 'Article description',
        body: 'Article body',
        tagList: []
      }
    },
    headers: {
      Authorization: authToken
    }
  });

  const newArticleResponseJSON = await newArticleResponse.json();
  //console.log(newArticleResponseJSON);
  expect(newArticleResponse.status()).toEqual(201);
  
})
