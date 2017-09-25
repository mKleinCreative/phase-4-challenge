# Phase 4 Challenge

This is a coding challenge for entrance to Phase 4.

To get started, create a new repository called `phase-4-challenge` and import the files from [the scaffold][scaffold]. Do all of your work in this repo.

During your interview, you'll review your solution with the interviewer. You'll then build a new feature to enhance the application. Read the [Live Coding Exercise](#live-coding-exercise) section at the end of this document for more details.

Skills covered:

- JavaScript
- HTML
- CSS
- HTTP
- Node.js
- Express
- SQL
- Server-side rendering
- Authentication & authorization

Each requirement is assigned a point value. A fully complete requirement will earn you full points; partially complete requirements get partial points; incomplete requirements get no points. Overall completeness is determined by dividing the total points earned by the total points available.

## Project Description

Build a web app where a community of record enthusiasts can review their favorite albums. The app will be called **Vinyl**.

The client has provided basic wireframes and user stories.

Some work has already been done for you in the [scaffold][scaffold]. Build off of the existing code and try to match the existing style in your solution.

_Requirements checked off below have already been completed in the [scaffold][scaffold]._

## Wireframes

Use these wireframes to guide your design.

**Real images are not required - you can just use placeholders for development.**

![app flow](https://user-images.githubusercontent.com/16725399/27102456-2d2a9950-503a-11e7-8552-6302645e1191.png)

## Sample Data

Use this data to seed the `albums` table on your database.

| Title               | Artist          |
|:--------------------|:----------------|
| Malibu              | Anderson .Paak  |
| A Seat at the Table | Solange Knowles |
| Melodrama           | Lorde           |
| In Rainbows         | Radiohead       |

## General

- [ ] __10:__ Solution is in a public repository called `phase-4-challenge`.
- [ ] __10:__ All dependencies are declared in a `package.json` file.
- [x] __10:__ Express is used for the web server.
- [x] __10:__ PostgreSQL is used for the database.
- [x] __10:__ Database is seeded with at least 4 albums (check out the [sample data](#sample-data)).

## Site Header

Content in the header varies based on the user's authentication state.

#### Requirements

Users can:

- [ ] __20:__ See the name of the website in the site-wide header.
- [ ] __20:__ See links to "Sign Up" and "Sign In" when logged out.
- [ ] __20:__ See links to "Profile" and "Sign Out" when logged in.

Layout:

- [ ] __20:__ The layout of the header matches the wireframes.

## Home

Displays various album-related information.

Routing:

- [X] __20:__ Navigating to `/` loads the home page.

Users can:

- [ ] __20:__ View all albums on the home page (under the "Records" heading).
- [ ] __20:__ View only the _**3 most recent**_ reviews on the home page sorted by newest first.
- [ ] __20:__ Click on an album title to go to the album page (e.g. `/albums/<ALBUM ID>`).

Layout:

- [ ] __10:__ The site-wide header is visible on the home page.
- [ ] __20:__ The layout of the home page matches the wireframes.

## Sign Up

Users are able to sign up for a new account.

#### Requirements

Routing:

- [ ] __20:__ Navigating to `/sign-up` loads the sign up page.

Users can:

- [ ] __20:__ Sign up for an account with name, email, and password.
- [ ] __20:__ Be redirected to their profile page (e.g. `/users/<USER ID>`) after signing up.

Users CANNOT:

- [ ] __30:__ Sign up without a name value.
- [ ] __30:__ Sign up without an email address value.
- [ ] __30:__ Sign up with an email that is already in use.
 
Layout:

- [ ] __10:__ The site-wide header is visible on the sign up page.
- [ ] __20:__ The layout of the sign up page matches the wireframes.

## Sign In

Users are able to sign in to an account.

#### Requirements

Routing:

- [ ] __20:__ Navigating to `/sign-in` loads the sign in page.

Users can:

- [ ] __20:__ Sign in to an existing account with an email address and password.
- [ ] __20:__ Be redirected to their profile page (e.g. `/users/<USER ID>`) after signing in.

Users CANNOT:

- [ ] __30:__ Sign in with an invalid email address and password combination.
 
Layout:

- [ ] __10:__ The site-wide header is visible on the sign in page.
- [ ] __20:__ The layout of the sign in page matches the wireframes.

## Sign Out

Users are able to sign out.

#### Requirements

Users can:

- [ ] __20:__ Be redirected to the home page (e.g. `/`) after signing out by clicking the Sign Out button.

Users CANNOT:

- [ ] __20:__ Perform any actions that require a user to be signed in after signing out.

## User Profile

Displays user details and submitted album reviews.

#### Requirements

Routing:

- [ ] __20:__ Navigating to `/users/<USER ID>` loads the user profile page.

Users can:

- [ ] __20:__ View their name, email, and join date.
- [ ] __20:__ View only their submitted reviews sorted by newest first.
- [ ] __20:__ View "trash can" delete icons only next to reviews submitted by users.
- [ ] __20:__ View a pop-up with a Cancel button, a Confirm button, and a message that reads, "Are you sure you want to delete this review?" after clicking the delete icon next to a review.
- [ ] __20:__ Have the pop-up dismissed after clicking Cancel.
- [ ] __20:__ Have the review deleted from the database and removed from the user profile page after clicking Confirm.

Layout:

- [ ] __10:__ The site-wide header is visible on the user profile page.
- [ ] __20:__ The layout of the user profile page matches the wireframes.

## Album Details

Displays album details and reviews.

#### Requirements

Routing:

- [X] __20:__ Navigating to `/albums/<ALBUM ID>` loads the album page.

Users can:

- [ ] __20:__ View the name of the album on the album page.
- [ ] __20:__ View all reviews for the album on album page sorted by newest first.
- [ ] __20:__ View "trash can" delete icons next to reviews the user can delete.
- [ ] __20:__ View a pop-up with a Cancel button, a Confirm button, and a message that reads, "Are you sure you want to delete this review?" after clicking the trash can icon next to a review.
- [ ] __20:__ Have the pop-up dismissed after clicking Cancel.
- [ ] __20:__ Have the review deleted from the database and removed from the album page after clicking Confirm.
- [ ] __20:__ View a button with the label "Add Review".
- [ ] __20:__ Be redirected to the new review page (e.g. `/albums/<ALBUM ID>/reviews/new`) the after clicking the "Add Review" button.

Users CANNOT:

- [ ] __20:__ Delete a review when not logged in.
- [ ] __20:__ Delete another user's review.

Layout:

- [ ] __10:__ The site-wide header is visible on the album page.
- [ ] __20:__ The layout of the album page matches the wireframes.

## New Review

Displays a form that allows users to submit album reviews.

#### Requirements

Routing:

- [ ] __20:__ Navigating to `/albums/<ALBUM ID>/reviews/new` loads the new review page.

Users can:

- [ ] __20:__ Enter multi-line text in the text field.
- [ ] __20:__ Click the Submit button to submit the review.
- [ ] __20:__ Be redirected to the album page (e.g. `/albums/<ALBUM ID>`) after submitting the review.

Users CANNOT:

- [ ] __20:__ Submit a review when not logged in.
- [ ] __20:__ Submit an empty review.

Layout:

- [ ] __10:__ The site-wide header is visible on the new review page.
- [ ] __20:__ The layout of the new review page matches the wireframes.

---

## Live Coding Exercise

During the interview, you'll have 20 minutes to work on a solution to a new challenge. This exercise will build on the solution you'll submit for the challenge above.

This part of the interview is pass/fail and is evaluated on based on your ability to demonstrate your understanding of the concepts and tools involved in building the site. You'll be allowed to ask your interviewer clarifying questions and can use the internet to search for information as needed.

Examples of features the interviewer might ask you to implement include:

#### Profile Features

Users can:

- See a "default" profile photo on their profile page before adding their own photo.
- Update their profile photo (e.g. via Uploadcare).
- See user profile photos next to their reviews.
- Receive a welcome email after creating an account.
- Visit user profile pages via "pretty" URLs, like "/users/james-franco".

#### Reviews

Users can:

- Visit album pages via "pretty" URLs, like "/albums/malibu".
- Add a star rating to reviews (from 1-5) and see the star rating for each review of an album in star icons.
- See review content truncated to 400 characters max on the home page, with a link to view more on the album page.
- See a relative published date, e.g. "2 days ago" on an album page.
- View only the 10 reviews at a time on an album page (pagination):
  - View a link/button to the "Next" 10 reviews on an album page.
  - View a link/button to the "Previous" 10 reviews on an album page.
- Comment on individual reviews:
  - See comment threads for a review.
  - See the number of comments they've left on their public profile.
  - Only add a comment when logged in.
  - Only delete their own comments.

#### Authentication & Authorization

Users can:

- View "pretty" error messages when form validations fail.

[scaffold]: https://drive.google.com/file/d/0B9iWVbGIe7lCQ2kzN2JTeWw3Mk0/view
