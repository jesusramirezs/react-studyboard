A **React** webapp to publish and study extended content in Markdown format organized in articles and categories and allowing annotations.

**Github repository**: https://github.com/jesusramirezs/react-studyboard
Please submit bug fixes via pull requests & feedback via issues.

<h2>Purpose</h2>

With this app, I intend to develop an example app by using some of the latest trends in real React app (redux, hooks,...) and that, besides fulfilling an educational function, offers an attractive functionality.

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/ins4hp38jgfls8oogjgs.png)

When I thought about developing **React StudyBoard**, I imagined an app where you could publish extensive articles on a particular study topic and organize them into sections or categories, which would be useful for the study. I want this app to be helpful as an educational and informative app not only for simple reading, and for this, It had to allow:

- Using **Markdown** for more friendly text formatting.
- Keeping a record of what has been read so far.
- To continue reading a text at the last point where it was left.
- To maintain an index of the following readings to be addressed by the student.
- Adapting the characteristics of the text to the **reader's preferences** (font type, size...)
- **Highlighting** important text for the reader.
- Adding and organizing **annotations** (also in Markdown format) to any text within the article.   
- Annotations must also support uploaded images (for now to Imgur).
- Being able to add **tags** to any annotation. 
- Editing annotations.
- Displaying the annotations made just by moving the cursor over the text without interrupting the reading flow.
- Quickly access to a list of all the annotations made in reverse chronological order of editing, from any of the articles, and from them, navigate to the point in the article to which they refer.

This is the first version, and later in this article, I will tell you about the next tasks to be tackled in future versions.

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/9z87frap1whhivgbe6k2.png)
![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/tjvjoq29j3x22kxyefot.png)
![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/38do4jyszh1huv2l5bff.png)
![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/ye23fkphqcts1jjlfkha.png)

<h2>Getting started</h2>

To get the frontend running locally:

- Clone this repo `git clone https://github.com/jesusramirezs/react-studyboard.git`
- `npm install` or `yarn` to install all required dependencies
- Optional: Edit the config-data.js file with your Firebase credentials and your Imgur API keys
- `npm start`/ `yarn start` to start the local server (this project uses create-react-app)
- App should now be running on `http://localhost:3000/`

<h2>Featuring</h2>

The project makes use of the following:

- React Hooks
- React Redux
- React Suite components
- Styled components
- Firebase authentication
- Markdown-to-jsx

<h2>Features</h2>

The code is reasonably easy to follow and understand. It is divided into pages and components, each of them in a separate folder; I think they are as simple and decoupled as possible so that we do not add excessive levels to the code. The same has been done with different **Redux** stores.  

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/9xthss3nx00ki1cg1vku.png)
![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/7hcre23btg3qu93a9xmu.png)
![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/zlcc90lo3u7u7n35hbyp.png)   

All contents: sections and articles are stored in two **JSON files**, easy to maintain and organize: one for categories and one for articles.

The Markdown formatting is applied using the component **Markdown-to-jsx**, in its version 6.11.4; I must mention that the last version of this package has generated some errors still to be solved.

This component supports different functions for each of the formats, and specific functions have been implemented for rendering (in text-block.component.jsx) :

- paragraph  
- list elements
- titles (h1...h6)

The **tag-input** component is used to enter tags in the annotation form and unique colors have been set aside for three specific tags so that they are visually easy to identify:

- re-read
- question
- highlight

All standard status management between components in the app is managed through **React-Redux**, and all access to the standard status is done through selectors.

Redux stores the most varied information:

- The visible or hidden state of the side panels
- The reading progress point of each article and the last article read.
- All content: articles and categories
Content of the reading list
- All text portions highlighted
- Annotations
- User preferences (preferred font and size)

The system uses local storage as user data storage, almost everything stored in Redux except the contents themselves.

So far, this could be enough, but obviously, it has its limitations, and in the next version, the app will probably use Firebase as cloud storage.

An authentication mechanism has been implemented through user password and **Google Auth** but only for educational purposes and to support the cloud storage and sharing of content and annotations between users in a future version. 

I am not a graphic designer, so I have tried to keep the style as simple as possible. To do this, I have used:

- **Tachyons CSS** as the main style base. 
- **Styled Components** to apply the styles to some of the components.
- **React Suite** for some particular components: drawer, progress bar.

There are **still many points of improvement and evolution in the project**:

<h2>From the functional point of view.</h2>

- Allow annotations on highlighting of any word selection.
- Allow the sharing of notes between different students.
- Allow several tabs to keep reading several articles at once. Perhaps use a splitter in the reading panel to have two or more articles active.
- Improve the management of image uploads to the cloud.
- Add night mode for reading.
- The possibility of publishing your articles (summaries, reflections) and dynamically integrating notes on other articles into the content.
- The possibility to export/import annotations in the JSON file.

EDIT: Dec 19, 2020

v1.1:

- *Accomplished*: Filter the side panel annotations according to tags. For example: display only "questions" or "re-readings.
- *Accomplished*: Allow highlighting of any word selection, not just whole paragraphs.
- *Accomplished*: Improved behaviour os scroll restoration mechanism.

<h2>From the technical point of view.</h2>

- PropTypes for type verification.
- Improve the naming of some components.
- Improve the communication mechanism between components, e.g., Article and Annotation Form.
- Use a database system for storage of items (instead of JSON files), statuses, and annotations. Perhaps based on Apollo and GraphQL.
- Integrate a complete testing system into the project.
- In-depth performance review.

## Credits
All texts have benn generated using https://www.blindtextgenerator.com/

All images come from the initiative Open Access from The Metropolitan Museum of Art:

https://www.metmuseum.org/about-the-met/policies-and-documents/open-access