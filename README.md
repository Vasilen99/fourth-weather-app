To run the project navigate to the root directory and type npm/yarn start. To build the journey is the same, but instead of start, use build command.
Same goes with tesing but use npm/yarn run test tests.

If I had more time I would probably implement different way for handling cities search. It would be type search and on submit to look for city coordinates.
Because of the possibility to call the API by city name the application could be optimized. The state could become only with city name instead of longitude and latitude coordinates.
If I had more time I would extend Error handling logic. Would create separate component about it and use it where error occurs. I would modify and extend 
loading logic and make it more user friendly.

The solution could be improved in several aspects. 

-Optimaze the performance by using useMemo. By useMemo any type of data that should not re-render during state or DOM updates could be momoized.
-Optimize the user experience. The app could be updated with several components - Footer & Header. They are almost mandatory for every modern website.
They Header will give the user chance to navigate through the application. That could be done with React Router and it's functionality to create SAP to looks like multipage app.
The Footer will contain privacy and cookie policies.
-To be prepared for live version (production). This could be done by using environment variables and some additional configurations. For production also is very important the SEO aspect.
The implementation of React Helmet and different strategies for better SEO are mandatory if we want to achieve high traffic.