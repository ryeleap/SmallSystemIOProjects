const fs = require('fs');
const prompt = require('prompt');
const FILE = 'data.json';

prompt.start();

let set;
if (fs.existsSync(FILE)) {
    const raw = fs.readFileSync(FILE, 'utf-8');
    set = new Set(JSON.parse(raw));
} else {
    set = new Set();
}

function capitalizeFirstLetter(str) {
    if (typeof str !== 'string' || str.length === 0) {
        return str;
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function mainMenu() {
    console.log("\nWelcome to the Grocery List App! What would you like to do today? Your options are:\n 1. Add item\n 2. Remove item\n 3. View list\n 4. Clear list\n 5. Exit");

    prompt.get(['Action'], function (err, result) {
        const action = result.Action;

        switch (action) {
            case '1':
                prompt.get(['Item'], function (err, result) {
                    if (!set.has(result.Item)) {
                        set.add(result.Item);
                        console.log('You added ' + capitalizeFirstLetter(result.Item) + ' to your grocery list.');
                    } else {
                        console.log('Item already exists in the list.');
                    }
                    mainMenu();
                });
                break;

            case '2':
                prompt.get(['Item'], function (err, result) {
                    if (set.delete(result.Item)) {
                        console.log('You removed ' + capitalizeFirstLetter(result.Item) + ' from your grocery list.');
                    }
                    else {
                        console.log('Item not found in the list.');
                    }
                    mainMenu();
                });
                break;

            case '3':
                count = 0;
                console.log("Your grocery list:\n");
                for (const item of set.values()) {
                    console.log((count + 1) + ". " + capitalizeFirstLetter(item));
                    count++;
                }
                mainMenu();
                break;

            case '4':
                set.clear();
                console.log('Your grocery list has been cleared.');
                mainMenu();
                break;

            case '5':
                console.log('Exiting the Grocery List App. Goodbye!');
                fs.writeFileSync(FILE, JSON.stringify(Array.from(set), null, 2), 'utf-8');
                break;

            default:
                console.log('Invalid choice. Try again.');
                mainMenu();
        }
    });
}

mainMenu();
