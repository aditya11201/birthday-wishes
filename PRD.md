# Product Requirements Document: BirthdaySurpriseWeb

## Problem Statement

Stasya, the friend whose birthday is being celebrated, deserves a memorable and personalized birthday greeting. Traditional methods of celebration, such as cards and messages, lack the interactive and immersive experience that can truly make her feel special. There is a need for a unique, interactive, and visually engaging web application that can surprise and delight her on her special day.

## Goals & Success Metrics

### Goals

1. Create a memorable and interactive birthday greeting for Stasya.
2. Ensure the web application is visually appealing and engaging.
3. Provide a personalized experience with custom messages and visual surprises.
4. Ensure smooth and seamless transitions between sections.

### Success Metrics

1. User engagement: Time spent on the web application should be at least 2-3 minutes.
2. Positive feedback: Collect at least 5 positive comments or reactions from Stasya and other users.
3. Technical performance: Achieve a 95% success rate in smooth transitions and animations.
4. User satisfaction: Ensure Stasya feels surprised and delighted by the experience.

## User Stories

1. **As a friend of Stasya, I want to create an interactive web application to celebrate her birthday, so that she feels special and surprised.**
2. **As a user, I want to navigate through the web application with smooth transitions and animations, so that the experience is seamless and engaging.**
3. **As a user, I want to see personalized messages and visual surprises, so that the birthday greeting is tailored to Stasya.**
4. **As a user, I want to interact with the web application by clicking buttons to reveal new sections, so that the experience is interactive and fun.**

## Functional Requirements

1. **Welcome Section**
    - Dark background with a photo of a dark room.
    - Animated text: "Gelap nih.... Coba nyalain lampunya ya stasya" with a typing animation.
    - Button: "Nyalakan Lampu" which, when clicked, transitions to the next section with a smooth animation.
2. **Light On Section**
    - Background gradually becomes lighter, simulating the effect of turning on the lights.
    - Animated text: "Wih keren, sekarang lampunya udah nyala nih..." with a typing animation.
    - Button: "Nyalakan Lampu" becomes disabled and changes to "Nyalakan Musik" after the text is completed.
3. **Music Section**
    - Animated text: "Nah sekarang coba kamu coba nyalain musiknya" with a typing animation.
    - Button: "Putar Musik" which, when clicked, reveals a Spotify-like popup with the incorrect song "Now Playing: Each Time You Fall in Love - Cigarettes After Sex."
    - Button: "Perbaiki Lagunya" which, when clicked, transitions to the next section.
4. **Correct Song Section**
    - Spotify-like popup with the correct song "Now Playing: Happy Birthday - Cigarettes After Sex."
    - Animated text: "Nah Lagunya udah bener nih Stasyaaa" with a typing animation.
    - Button: "Perbaiki Lagunya" becomes disabled.
5. **Personal Greeting Section**
    - Animated text: "Nah sekarang Stasyaaaa" with a typing animation.
    - Button: "Personal Greeting" which, when clicked, transitions to the next section.
6. **Decorations Section**
    - Animated text: "Bantu akuu yaa buat dekor ruangannya" with a typing animation.
    - Button: "Tambahkan Dekorasi" which, when clicked, reveals a room with birthday decorations and transitions to the next section.
7. **Gift Section**
    - Animated text: "Stasya biasanya kalau ultah kamu butuh apa sih?" with a typing animation.
    - Button: "Kue" and "Adit" which, when clicked, lead to different paths (Kue path leads to Section 11, Adit path leads to Section 10B).
8. **Kue Path**
    - Section 11: Animated text: "Nah Tinggal nyalain lilinnya" with a typing animation.
    - Button: "Nyalakan Lilinnya" which, when clicked, reveals a cake with lit candles and transitions to the next section.
9. **Adit Path**
    - Section 10B: Animated text: "NO NO YA STASYAA ADIT PUNYA AKUU ~KAREN CANGTIPP YANG NGOMONG" with a typing animation.
    - Automatic transition to Section 11.
10. **Balloon Section**
    - Animated text: "Nah sekarang tinggal terbang in balonnya" with a typing animation.
    - Button: "Lepas Balonnya" which, when clicked, reveals 13 balloons floating and bouncing around the screen.
11. **Final Greeting Section**
    - Animated text: "Nah balonnya udah terbang nih stasyaa" with a typing animation.
    - Button: "HAPPY BIRTHDAY" which, when clicked, reveals a banner with "Happy Birthday" and transitions to the next section.
12. **Love Message Section**
    - Animated text: "On your birthday, I want to take a moment to express my love for you. You’re not just my girlfriend but my best friend and my rock. Today, I celebrate you and all the wonderful qualities that make you so incredibly special." with a typing animation.
    - Button: "Stasyaa Annesty" which, when clicked, reveals a personalized love message and transitions to the final section.
13. **Pesan dari Adit Section**
    - Button: "Pesan dari Adit" which, when clicked, reveals a message from Adit and transitions to the final section.
14. **Final Section**
    - Display all previous elements in a visually pleasing and organized manner.
    - Balloons spelling "Stasya" above the cake and "Annesty" below the cake.
    - Personalized love message and message from Adit.

## Non-Functional Requirements

1. **Performance**
    - Ensure smooth transitions and animations with no lag or jitters.
    - Load time for each section should not exceed 1 second.
2. **Usability**
    - Intuitive and user-friendly interface.
    - Clear and readable text with a minimum font size of 16px.
    - Responsive design that works well on both desktop and mobile devices.
3. **Security**
    - Ensure the web application is secure and does not store any personal information.
4. **Scalability**
    - Design the application to handle an increased number of users if shared widely.
5. **Accessibility**
    - Ensure the application is accessible to users with disabilities, including screen reader compatibility and keyboard navigation.

## Open Questions

1. **Content Customization**: Should the application allow for the text and messages to be fully customizable by the user, or should they be hardcoded?
2. **Music Integration**: What are the legal considerations for using copyrighted music in the application?
3. **User Feedback**: How will user feedback be collected and analyzed?
4. **Mobile Optimization**: What specific optimizations are needed for mobile devices to ensure a seamless experience?
