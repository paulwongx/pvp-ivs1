## Pokemon Go PVP IV Spread Chart

This project was created to help the Pokemon Community more easily access their Pokemon's IV's for PVP (Player-versus-Player).

This project was created to:
1. Remove ads from the website
2. Have a mobile optimized website
3. Simplify the design

Specs:
1. Enter in Pokemon
2. Enter in Attack, Defense, Stamina
3. Enter in league - Great, Ultra, Master
4. Get back list of IVs with stats based on different ADS
5. Get rank 1 IVs for that set of inputs

Goal: Make it easier to use than current website


Draft Notes:
1. 4096 variations for each Pokemon - 16 * 16 * 16 (incl 0 stat)
2. Object array output includes:
{
    'atkStat': integer,
    'defStat': integer,
    'staStat': integer,
    'level': integer,
    'cp': integer,
    'hp': integer,
    'atkProd': integer,
    'defProd': integer,
    'staProd': integer,
    'prod': integer,
    'pctMax': integer
}

Level formula:
if is_level41 == false:




## Requirements

### Functional Requirements
1. Create function that creates a json object with approx 135,000 entries (15 x 15 x 15 x 40) which are the table results of a Pokemon - DONE
    - Create a function to get the cp of a Pokemon - DONE
    - Create a function to pull the GameMaster from the github page - DONE
    - Create a function to pull the specific Pokemon data from the GameMaster

2. On load...
    - Gamemaster is fetched from Github


### Visual Requirements
1. Have a floating menu at the bottom
    - On the right of the floating menu is the submit button
    - On the left of the floating menu are images of the Pokemon's evolution and pre-evolution
2. When table is loading...
    - A loading spinner shows up when the data is being calculated
    - A table of stat products show up with Pokemon information
    - You can infinitely scroll to get more data
    - The Pokemon you entered is clearly identified as the first row
    - You can switch right on the table to access the same stats for a different league (great, ultra, master)
    - When you swipe across the table to different leagues, the image showing which league is clearly shown
    - The table slides up from the bottom and fades in within 0.3-0.7 seconds
3. When searching for Pokemon...
    - Dropdown menu appears spanning the full width of the search bar
    - The suggestions are spaced out vertically like in a Google search
    - There is an image of the Pokemon on the right hand side
    - There is a left arrow on the left hand side of the search box to go back
4. When entering Pokemon stats...
    - Research: Ideally have a scroller on the page, otherwise...
    - There is a scroller that pops up on mobile for each value
    - After selecting a value, it automatically selects the next value for input
    - After the last value, it closes back to the menu bar


# Extra: Testing
1. There is a testing module for this app
    - Up to 5 Pokemon data are tested for values
    - 3 Pokemon are tested based on controversial stats based on Reddit research
    - Level 41 Pokemon are tested
2. The app runs serverless
3. The app can be uploaded onto Heroku and works the same
4. Any changes can be pushed to the website via a Github push but needs to pass these tests
5. Functional testing
    - Attack, Defense, Stamina cannot be more than 15
    - Pressing enter gives you table data
    - Results show up in less than 1.5 seconds