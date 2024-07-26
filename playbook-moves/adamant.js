new Roll('Trick an NPC')
    // add passion
    .sumTotal()
    .appendText('hit', 'Your work pays off, creating an opportunity for you and your allies at just the right time')
    .appendText('part', 'The opportunity is fleeting—act fast to stay ahead of the consequences.')
    .appendText('miss', 'Your action was ill-judged and something or someone you care about is hurt as collateral damage.')
    .composeMessage()

new Roll('Takes One to Know One')
    // add focus
    .sumTotal()
    .appendText('hit', 'Ask one question')
    .appendText('part', 'They ask one of you as well.')
    .appendText('hit', 'Anyone who lies or stonewalls marks 2-fatigue.')
    .appendText('miss', 'Your attack leaves you exposde; they may ask you any one question, and you must answer honestly.')
    .appendBullet('What is your principle?')
    .appendBullet('What do you need to prove?')
    .appendBullet('What could shake your certainty?')
    .appendBullet('Whom do you care about more than you let on?')
    .composeMessage();

new Roll("Here's the Plan")
    //add creativity
    .sumTotal()
    .appendText('full', 'Hold 2.')
    .appendText('part', 'Hold 1.')
    .appendText('miss', 'Hold 1, but your plan goes awry when you encounter surprising opposition.')
    .appendText('You can spend your hold 1-for-1 while the plan is being carried out to overcome or evade an obstacle, create an advantage, or neutralize a danger; if any of your companions abandon you while your plan is underway, you must mark a condition.')
    .composeMessage();

new Roll ('You Missed Something')
    // add focus
    .sumTotal()
    .appendText('hit', 'The GM tells you how you can drastically improve the chances of success; get it done, and they’re sure to come through on top.')
    .appendText('part', 'The problems inherent in the plan are fairly serious; the NPC will be resistant to making the necessary changes.')
    .appendText('miss', 'Something about the plan throws you for a loop; the GM tells you what obvious danger the NPC is ignoring…or what they’re hiding about their intent.')

new Roll('Straight Shooter')
    // add focus
    .sumTotal()
    .appendText('hit', "They’ll took upon your honestly favorably; they’ll answer a non-compromising question honestly and grant you a simple favor")
    .appendText('part', 'They also give you an honest assessment of how they see you; mark a condition.')
    .appendText('miss', 'You’re a bit too honest; they’re either furious or genuinely hurt.')