# Calculator

An accessible calculator built with HTML, CSS and vanilla JavaScript.

## Table of Contents

- [Overview](#overview)
  - [Project Aim](#project-aim)
  - [Design](#design)
  - [Live Site](#live-site)
- [Technologies Used](#technologies-used)
- [Useful Resources](#useful-resources)

## Overview

### Project Aim

The aim of this project is to design, build and deploy an accessible calculator capable of performing basic mathematical operations, i.e., addition, subtraction, multiplication and division. This web application implements the following key accessibility features:
- Keyboard-only navigation support and keyboard bypass mechanism using shortcuts
- Contrast themes support
- Screen reader use support
- Voice input software use support

### Design

This web application features a light and dark theme design. Its layout was built with a mobile-first responsive design that has been optimized for mobile, tablet, laptop and desktop devices.

### Live Site

[View the Live Site](https://accessible-calculator.netlify.app/)

## Technologies Used

- Semantic HTML5 markup
- ARIA roles and properties
- CSS including flexbox, grid and custom properties
- Custom Webfonts
- Modern JavaScript (ES6+) syntax

## Useful Resources

- The [Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/) provides a wide range of recommendations for building accessible websites and web applications. Its success criteria served as testable requirements for assessing the accessibility of this web application.

- The [Aria Authoring Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg/patterns/) provides patterns for building accessible user-interface (UI) components across the web. They served as a blueprint for the development of this calculator.

- Although the [Aria Authoring Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg/patterns/) provides several widely-supported patterns, it is sometimes the case that these patterns are only marginally supported by assistive technologies. One of such cases is the dialog widget. On implementing the recommended pattern for a modal dialog and testing with screen readers, I discovered that only a minority announced the widget as expected. This article on [creating accessible dialogs](https://www.scottohara.me/blog/2019/03/05/open-dialog.html) by Scott O'Hara was instrumental to building a modal dialog that had much wider screen reader support.
