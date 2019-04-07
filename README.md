# Swift Project Creation

This extension allows to create an empty Swift project in VS Code. The necessary `Package.swift` file, a dummy `main.swift` file as well as VS Code-specific workspace files are generated. The user only needs to select a root folder for his workspace and indicate a project name.

This extension works well with Apple's [SourceKit-LSP for Visual Studio Code](https://github.com/apple/sourcekit-lsp/tree/master/Editors/vscode).

## Installation
You can install this extension from the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=cgrevisse.swift-project-creation).

# Usage

* Install the extension and reload VS Code.
* Press `Ctrl+Shift+P` and enter `swift`. The autocompletion should suggest the option *Create a Swift Project*.
* Choose a root folder where the Swift project will be created in. A new folder with the necessary files will be created inside.
* Indicate the name of your Swift project.
* The newly created workspace will be opened and the editor will show the `main.swift` file.
* Happy Swift-ing :-)

# Contributors

* Christian Grévisse, [@cgrevisse](https://github.com/cgrevisse), University of Luxembourg.

# Bugs, Comments, Suggestions, Contributions?

Feel free to [drop me a line](mailto:christian.grevisse@uni.lu) or [open an issue](https://github.com/cgrevisse/swift-project-creation/issues) for any kind of report or collaboration.