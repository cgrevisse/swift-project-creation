# Swift Project Creation

This extension allows to create an empty Swift package in VS Code. The necessary `Package.swift` file, a dummy `main.swift` file as well as VS Code-specific workspace files are generated. The user only needs to select a root folder for his workspace and indicate a package name.

This extension works well with the [Maintained Swift Development Environment](https://marketplace.visualstudio.com/items?itemName=vknabel.vscode-swift-development-environment) maintained by [Valentin Knabel](https://github.com/vknabel).

# Usage

* Install the extension and reload VS Code.
* Press `Ctrl+Shift+P` and enter `swift`. The autocompletion should suggest the option *Create a Swift Package*.
* Choose a root folder where the Swift package will be created in. A new folder with the necessary files will be created inside.
* Indicate the name of your Swift package.
* The newly created workspace will be opened and the editor will show the `main.swift` file.
* Happy Swift-ing :-)

# Contributors

* Christian Grévisse, [@cgrevisse](https://github.com/cgrevisse), University of Luxembourg.

# Bugs, Comments, Suggestions, Contributions?

Feel free to [drop me a line](mailto:christian.grevisse@uni.lu) or [open an issue](https://github.com/cgrevisse/swift-project-creation/issues) for any kind of report or collaboration.