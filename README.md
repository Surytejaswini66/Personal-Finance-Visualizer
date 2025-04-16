# Personal Finance Visualizer

The primary goal of this Project is to develop a personal finance visualizer web application using **Next.js**, **React**, **shadcn/ui**, **Recharts**, and **MongoDB**. The application will enable users to track their income and expenses, categorize transactions, and set budgets. The expected learning outcomes include proficiency in front-end development with React and Next.js, back-end development with MongoDB, UI design with shadcn/ui, data visualization with Recharts, and implementing responsive designs with error handling.

### Step-by-Step Instructions

#### Project Setup and Initialization

1. **Create Project Directory**  
   Create a new directory for your project using the command line:  
   `mkdir personal-finance-visualizer && cd personal-finance-visualizer`

2. **Initialize Next.js Project**  
   Initialize a Next.js project using:  
   `npx create-next-app@latest .`  
   Choose **TypeScript**, **ESLint**, **Tailwind CSS**, **src/** directory, **app router**, and **import alias** when prompted.

3. **Install Dependencies**  
   Install necessary dependencies:  
   `npm install @radix-ui/react-slot recharts mongoose zod react-hook-form tailwind-merge class-variance-authority clsx date-fns`  
   `npm install -D prettier-plugin-tailwindcss`

4. **Configure shadcn/ui**  
   Initialize shadcn/ui by running:  
   `npx shadcn-ui@latest init`  
   Follow the prompts to configure your project with the desired styling and components.

5. **Set up MongoDB**  
   Ensure you have MongoDB installed locally or are using a cloud-based MongoDB service like MongoDB Atlas. Obtain the connection string for your MongoDB database. Create a `.env.local` file in your project root and add:  
   `MONGODB_URI=mongodb+srv://suryaviswanadhapalli666:cQ39TVz3PqiQ0FH4@cluster0.viu0pz7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

#### Development Process

##### Basic Transaction Tracking

1. **Define Transaction Schema (MongoDB)**  
   Create a `models` directory and within it, create a `transaction.js` file. Define a Mongoose schema for transactions with fields like `amount` (Number), `date` (Date), and `description` (String). Use Zod to ensure type safety and validation.

2. **Create API Routes (Next.js)**  
   In the `app/api` directory, create API routes for:  
   `POST /api/transactions` - To create a new transaction.  
   `GET /api/transactions` - To retrieve all transactions.  
   `PUT /api/transactions/[id]` - To update an existing transaction.  
   `DELETE /api/transactions/[id]` - To delete a transaction.  
   Use the Mongoose model to interact with MongoDB in these API routes. Handle errors gracefully.

3. **Develop Transaction Form (React)**  
   Create a React component for adding/editing transactions. This form should include fields for amount, date, and description. Use React Hook Form and Zod for form validation and state management.

4. **Develop Transaction List View (React)**  
   Create a React component to display a list of transactions. Fetch transaction data from the `GET /api/transactions` endpoint and render it in a table or list format. Implement the delete functionality, using the `DELETE` API call.

5. **Implement Monthly Expenses Bar Chart (Recharts)**  
   Use Recharts to create a bar chart that displays monthly expenses. Aggregate transaction data by month and pass it to the Recharts component. Ensure the chart is responsive.

6. **Implement Basic Form Validation**  
   Ensure that all form fields (amount, date, description) have appropriate validation.

##### Categories

1. **Update Transaction Schema (MongoDB)**  
   Add a `category` field (String) to the transaction schema in `transaction.js`.

2. **Define Predefined Categories**  
   Decide on a set of predefined categories for transactions (e.g., Food, Rent, Utilities, Transportation, Entertainment). Store these categories in an array that can be used in the frontend for dropdown selection in the transaction form.

3. **Update Transaction Form (React)**  
   Add a dropdown menu to the transaction form to select a category for each transaction. Populate this dropdown with the predefined categories.

4. **Create API routes for Category Management**  
   Add the following API routes to manage categories:  
   `GET /api/categories` - Retrieves a list of predefined categories.  
   `POST /api/categories` - Adds a new category to the list.

5. **Implement Category-wise Pie Chart (Recharts)**  
   Use Recharts to create a pie chart that displays the breakdown of expenses by category. Aggregate transaction data by category and pass it to the Recharts component. Ensure the chart is responsive.

6. **Create Dashboard (React)**  
   Create a dashboard component to display summary information.

7. **Implement Summary Cards**
   - **Total Expenses**: Calculate and display the total expenses for the current month.
   - **Category Breakdown**: Display the percentage breakdown of expenses for each category.
   - **Most Recent Transactions**: Display a list of the most recent transactions.

##### Budgeting

1. **Create Budget Schema (MongoDB)**  
   Create a `budget.js` model file and define a Mongoose schema for budgets with fields like `category` (String), `amount` (Number), and `month` (Date or String representing the month).

2. **Create API Routes (Next.js)**  
   Create API routes for:  
   `POST /api/budgets` - To create/update a budget for a category.  
   `GET /api/budgets` - To retrieve all budgets.

3. **Develop Budget Form (React)**  
   Create a React component for setting monthly category budgets. This form should include fields for category and budget amount. Use React Hook Form for form management.

4. **Implement Budget vs. Actual Comparison Chart (Recharts)**  
   Use Recharts to create a chart that compares the budgeted amount for each category with the actual spending. Display this chart on the dashboard. (A combination chart of bar and line would be suitable.)

5. **Implement Spending Insights**  
   Provide simple spending insights based on the budget vs. actual comparison. For example, highlight categories where the user is over budget. Display these insights on the dashboard.

#### Deployment

Live URL at https://finance-visualizer.netlify.app/

#### Screenshots of Testing Using Postman

Tested with Postman to ensure all endpoints work as expected. screenshots of the Postman tests, located in the `images` folder
