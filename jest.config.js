// jest.config.js
const nextJest = require("next/jest");

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: "./",
});

const babelConfigEmotion = {
    presets: [
        [
            "next/babel",
            {
                "preset-react": {
                    runtime: "automatic",
                    importSource: "@emotion/react",
                },
            },
        ],
    ],
    plugins: [
        require.resolve("babel-plugin-macros"),
        require.resolve("@emotion/babel-plugin"),
    ],
};

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
    // Add more setup options before each test is run
    // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
    moduleDirectories: ["node_modules", "<rootDir>/"],
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

    // If you're using [Module Path Aliases](https://nextjs.org/docs/advanced-features/module-path-aliases),
    // you will have to add the moduleNameMapper in order for jest to resolve your absolute paths.
    // The paths have to be matching with the paths option within the compilerOptions in the tsconfig.json
    // For example:

    moduleNameMapper: {
        // "@/(.*)$": "<rootDir>/src/$1",
        "^@/components/(.*)$": "<rootDir>/components/$1",
        "^@/contexts/(.*)$": "<rootDir>/contexts/$1",
        "^@/mocks/(.*)$": "<rootDir>/mocks/$1",
    },
    testEnvironment: "jest-environment-jsdom",
    transform: {
        "^.+\\.(js|jsx|ts|tsx|mjs)$": ["babel-jest", babelConfigEmotion],
    },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
