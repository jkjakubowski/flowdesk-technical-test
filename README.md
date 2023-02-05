# Description
This app was made as a technical assignment for a frontend role @Flowdesk
It allows you to select a cryptocurrency pair and display related data from the Binance Public API: price, last24h ticker and 10 last trades.
You can have a look quickly at https://flowdesk-technical-test-jk.netlify.app/.

The app allows you to sort the trades by price, quantity and time.

# How to launch the app locally
1. Clone the repo
2. Install packages
3. Use `yarn dev`. The project should run in `http://localhost:5173/`

# What can be added/enhanced
1. Create a custom hook to handle multiple React Query queries on submit
2. And therefore display a loader on the interface while data is fetched (Skeletons on the Table for example)
3. A better responsive
4. Properly fix some types (I used `any` on purpose in one or two places to deploy the project)
5. I tried to configure paths in `tsconfig.json` in order to have better imports paths, but it seems that it doesn't work.
6. Use GraphQL to avoid over-fetching
7. Create a validation schema with Yup in order to handle cases where user types a wrong value in the pair input & display an error
8. I restricted last trades to 10 on purpose. Adding pagination and allow more results is also a good idea
9. The favicon is working locally but it seems it doesn't work in production
10. Use I18N to display some content (I hardcoded texts). But since there was really little content I didn't judge it as useful

# Some feature ideas
1. Display real-time prices for x top pairs using websockets
2. Make a light/dark mode switch

# How it looks
I used Flowdesk's design system (font, font-size, spacing, colors) and Material UI components (a bit customized)

<img width="1497" alt="Capture d’écran 2023-02-06 à 00 10 41" src="https://user-images.githubusercontent.com/25428600/216852592-a7c632cf-ded8-4667-b1b7-4b511c9007e0.png">
![Capture d’écran 2023-02-06 à 00 44 15](https://user-images.githubusercontent.com/25428600/216852825-0bf908a6-72a0-4e80-a782-6c8606cb3800.png)




