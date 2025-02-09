# CoffeeShopMenu-UI

CoffeeShopMenu-UI is a user-friendly web interface designed to interact seamlessly with the [CoffeeShopMenuAPI](https://github.com/EmreCerrah/CoffeeShopMenuAPI). This application allows coffee shop owners and staff to efficiently manage their menus through an intuitive graphical interface.

## Technologies Used

- **Next.js**: For building the user interface.
- **Fetch API**: For making HTTP requests to the API.
- **Shadcn UI**: For application components.
- **Tailwind**: For styling the application.

## Features

- **Menu Display**: View all available menu items in a structured format.
- **Add New Items**: Easily add new beverages or food items to the menu.
- **Edit Existing Items**: Update details of existing menu items, including name, category, and price.
- **Delete Items**: Remove items that are no longer offered.
- **Category Management**: Organize menu items into categories for better accessibility.

## Prerequisites

Before running the CoffeeShopMenu-UI, ensure that the [CoffeeShopMenuAPI](https://github.com/EmreCerrah/CoffeeShopMenu-API) is up and running, as the UI relies on the API for data operations.

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/EmreCerrah/CoffeeShopMenu-UI.git
   cd CoffeeShopMenu-UI
   ```

2. **Install Dependencies**:
   Use npm to install the necessary dependencies:
   ```bash
   npm install
   ```

3. **Configure API Endpoint**:
   In the project directory, locate the configuration file (e.g., `config.js` or `.env`) and ensure the API endpoint is correctly set to communicate with your running instance of CoffeeShopMenuAPI:
   ```javascript
   const API_BASE_URL = 'http://localhost:8080';
   ```

4. **Run the Application**:
   Start the development server:
   ```bash
   npm run dev
   # or
   npm run start
   ```
   The application will typically run on `http://localhost:3000`.

## Usage

- **Viewing the Menu**: Upon launching the application, the homepage will display the current menu items fetched from the API.
- **Adding a New Item**: Navigate to the 'Add Item' section, fill in the required details, and submit to add a new menu item.
- **Editing an Item**: Click on an existing item to edit its details and save the changes.
- **Deleting an Item**: Select the delete option next to an item to remove it from the menu.

## Project Structure

```
CoffeeShopMenu-UI
├── 
│   ├── [lang]
│   │   ├── [categoryId]
│   │   │   └── [categoryName]
│   │   │       └── page.tsx
│   │   ├── page.tsx
│   ├── dashboard
│   │   ├── categories
│   │   ├── ...
│   │   ├── products
│   │   ├── ...
│   │   ├── page.tsx
│   │   ├──layout.tsx
│   ├── components
│   │   ├── admin
│   │   ├── home
│   │   ├── ui
│   │   └── ...
│   ├── services
│   │   └── AuthService.ts
│   │   └── MenuService.ts
│   ├── page.tsx
│   ├── layout.tsx
│   └── ...
├── .gitignore
├── package.json
├── README.md
└── ...
```

- **components**: Contains React components for different parts of the UI.
- **services**: Includes modules for API calls and data handling.
- **app**: Main source code directory.

## Integration Diagram

The following diagram illustrates the interaction between the CoffeeShopMenu-UI and the CoffeeShopMenuAPI:

```
[User] ---> [CoffeeShopMenu-UI] ---> [CoffeeShopMenuAPI] ---> [Database]
```

In this flow:
- The **User** interacts with the **CoffeeShopMenu-UI**.
- The **UI** sends requests to the **CoffeeShopMenuAPI**.
- The **API** communicates with the **Database** to perform CRUD operations.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure that your code follows the project's coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
