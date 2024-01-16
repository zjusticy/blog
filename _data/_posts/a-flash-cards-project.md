---
title: "A markdown-capable flash cards project using React, Redux and Firebase"
date: "2020-07-10T22:40:32.169Z"
description: "A useful project for React beginners"
---

![](/0*gQj7ECqJQeTqbW1M.png)

Flashcards are the fast and best way to absorb knowledge. Whether you are memorizing vocabulary, physical or Java interview questions, flashcards are always the best fit.

For our project, we have two main goals: one is a simple and fun UI, another is markdown showing capability.

[Github](https://github.com/zjusticy/flashCards)

[Demo without Firebase](https://toms-cards.vercel.app)

## Pages and Data Structure

There are three main pages in this web application.

1. **The introduction page**. This is the entrance of the application. We can add or remove list from our database. It also contains all the list names of cards we have.

![](/img/intro.png)

2. **The memorizing page**. This is the page for memorizing the cards. If you already know the answer, click the easy button. Otherwise click the right arrow. The card will show up again later. If you want to change the status of the previous cards, click the left arrow. The show/hide button is used to switch between the front and back side of the card.

![](/img/memBoard.png)

```
 // state of this page
 memName: "",  // the name of the card
 memId: null,  // the id of the card
 memIndex: null, // the index of the card in activeList
 flashBack: null, // the cache of the previous card
 activeList: [],  // the list of cards for this round
 backUpList: [], // the list of cards for next round
 again: true,  // whether we want to see this card again
 hide: true, // front side or back side
 traceBack: false,  // if we are checking the previous card
 done: false, // when we reach the last card
```

3. **The update page**. This is the page when we want to add/delete or update the card.

![](/img/update.png)

```
 // state of this page
 orderForm: { // The card information
   front: { // front side information
     value: myPlaceHolderF,
     valid: true,
   },
   back: { // back side information
     value: myPlaceHolderB,
     valid: true,
   },
 },
 formIsValid: true,  // whether the form is valid or not
 preview: false,  // showing the rendered markdown text
 addNew: true,  // adder status or update status
```

## Data in Redux and Firebase

- Data in redux

```
// list of cards
listNames: [],

// Cache of all lists, has the structure like {name1:{id1:card1, id2:card2}, name2:{id3:card3, id4:card4}...}
cardsCache: {},

// Sorted Ids for one active list of cards
sortedIds: [],

// Name of the current list
activeListName: "",

// id of card being operated
activeId: null,

// true: single column, false: double columns
modeS: true,
```

- Data in firebase

[Google’s Firebase](https://firebase.google.com/docs/storage/web/start) is a convenient online database with authority management. Cloud Storage for Firebase lets you upload and share user generated content.

The rule for the database accessibility is:

```
{
  "rules": {
    "userData": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    }
  }
}
```

The user can only write and read the content in their own folder. The data stored under user’s folder is structured as below:

```
// names of all lists
lists: {name1:timestamp1, name2:timestamp2, ...}

// the list has the structure like
{name1:{id1:card1, id2:card2, ...}}
```

## The Algorithm for Memorizing

We do not have any memory curve in this application. The logic is: first, go through all the cards once, and store the cards you want to memorize again in random order. Second, go through the cards you stored in the previous step and store the cards you are still unclear, and so on so forth.

[Github](https://github.com/zjusticy/flashCards)
