# Todo App using React + Vite

This is a simple To-Do list app using React JS & Supabase as the backend.

# React Library Used in this Project

1. React Router
2. React Error Boundary
3. React Hook Form
4. React Query
5. React Icons and Toasts
6. Styled Components for styles
7. Supabase

# Features
1. To-Do List
* [x] create a new list
* [ ] delete a list
* [ ] search for a list

2. To-Do Items
* [x] create a new item
* [x] edit an item
* [x] delete an item
* [x] search for items by tag
* [x] search for items by name
* [x] check / uncheck an item
* [x] filter items by status (done, pending)
* [ ] sort items by modified date (ascending, descending)

3. Users
* [x] sign up (with email and password)
* [x] login
* [x] logout

4. Sharing
* [x] share a list with a user (read only)
* [x] share a list with a user (editable)

5. UI Features
- collapsible menu:
* [x] mobile view
* [ ] click on menu button

6. Admin Features
* [ ] create a user
* [ ] delete a user

## Development Notes

- **Environment Variables:**
  Store your Supabase credentials in a `.env` file at the project root.
  Example:
  ```
  VITE_SUPABASE_URL=your-supabase-url
  VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
  ```

- **Scripts:**
  - `npm run dev` — Start development server
  - `npm run build` — Build for production
  - `npm run lint` — Run ESLint

- **Code Style:**
  - Follow the ESLint rules included in the project.
  - Use descriptive commit messages.

- **Testing:**
  Add unit tests for new features and bug fixes.
  (If you use a testing framework, mention it here.)

- **Folder Structure:**
  Keep components in the `src/components` folder.
  Place assets in the `public` folder.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
