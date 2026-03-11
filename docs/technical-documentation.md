# Technical Documentation

## Overview

This portfolio website was developed using HTML, CSS, and JavaScript.  
Assignment 2 extends Assignment 1 by adding more dynamic and interactive front-end behavior.

## Implemented Features

### 1. Dynamic Project Rendering
Projects are stored in a JavaScript array and rendered dynamically into the Projects section.  
This makes the content easier to maintain and update.

### 2. Live Project Search
A search input was added to allow users to filter projects while typing.  
The filter checks project titles, descriptions, and tags.

### 3. Theme Persistence with localStorage
The website supports light and dark mode.  
The selected theme is saved in `localStorage`, so the user’s preference remains after refreshing the page.

### 4. Contact Form Validation
The contact form validates:
- Name length
- Email format
- Message length

Error messages are shown below the related field, and a success message appears after valid submission.

### 5. Scroll Spy Navigation
The navigation highlights the section currently visible on screen using `IntersectionObserver`.

### 6. Responsive Mobile Menu
The navigation menu supports small screens using a toggle button and a responsive layout.

### 7. Feedback and Empty State
If no projects match the search text, the website displays:

`No projects found. Try another search term.`

This ensures the user always receives feedback.

## CSS and User Experience Improvements

The CSS includes:
- Responsive layout with breakpoints
- Hover transitions for buttons, links, and cards
- Fade-in animation for project cards and status messages
- Structured spacing and sizing for cleaner content presentation

## Files Used

- `index.html`
- `css/styles.css`
- `js/script.js`