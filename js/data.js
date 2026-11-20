/* ==========================================================================
   Purely Sweet — Ebook Catalog & Free Gluten-Free Dessert Recipes
   Edit prices, descriptions, Stripe/Gumroad links, or add recipes here.
   ========================================================================== */

window.PURELY_SWEET_DATA = {
  ebooks: [
    {
      id: "purely-sweet",
      title: "Purely Sweet: 60 Everyday GF Desserts",
      subtitle: "190 Pages · 60 Recipes",
      tag: "Bestseller",
      price: 24,
      oldPrice: 32,
      image: "images/ebook-cover.jpg",
      description:
        "Our flagship cookbook featuring foolproof cakes, brownies, tarts, cookies, and our complete GF Flour Pairing Guide.",
      fileLabel: "Purely-Sweet-60-GF-Desserts.pdf (42 MB)",
      bundle: false
    },
    {
      id: "chocolate-caramel",
      title: "The Chocolate & Caramel Collection",
      subtitle: "110 Pages · 32 Recipes",
      tag: "Fan Favorite",
      price: 18,
      oldPrice: 24,
      image: "images/caramel-brownies.jpg",
      description:
        "Deep dark ganache tarts, molten lava cakes, salted caramel pecan brownies, and silky mousse—all 100% gluten-free.",
      fileLabel: "Chocolate-Caramel-GF-Collection.pdf (28 MB)",
      bundle: false
    },
    {
      id: "complete-bundle",
      title: "The Complete Baker’s Bundle (All 3 Ebooks)",
      subtitle: "420+ Pages · 125+ Recipes",
      tag: "Best Value · Save $15",
      price: 49,
      oldPrice: 64,
      image: "images/hero-tart.jpg",
      description:
        "Includes Purely Sweet, The Chocolate & Caramel Collection, plus Holiday & Celebration Baking and our Printable Pantry Charts.",
      fileLabel: "Purely-Sweet-Complete-Bundle.zip (112 MB)",
      bundle: true
    }
  ],

  recipes: [
    {
      id: "lemon-ricotta-cake",
      title: "Lemon Blueberry Ricotta Cake",
      image: "images/lemon-cake.jpg",
      time: "45 min",
      yield: "8–10 slices",
      difficulty: "Easy",
      categories: ["cakes", "dairy-free"],
      tags: ["Almond Flour", "One-Bowl", "Naturally GF"],
      summary:
        "Impossibly tender, bright with fresh lemon zest, and studded with juicy blueberries—zero gums or specialty blends required.",
      ingredients: [
        "200 g (2 cups) blanched superfine almond flour",
        "45 g (⅓ cup) tapioca starch (or arrowroot)",
        "1½ tsp baking powder & ¼ tsp fine sea salt",
        "240 g (1 cup) whole-milk ricotta (or almond ricotta for dairy-free)",
        "150 g (¾ cup) granulated cane sugar",
        "3 large eggs, at room temperature",
        "80 ml (⅓ cup) extra-virgin olive oil or melted butter",
        "Zest of 2 organic lemons + 2 tbsp fresh lemon juice",
        "150 g (1 cup) fresh blueberries + powdered sugar for dusting"
      ],
      steps: [
        "Preheat oven to 350°F (175°C). Grease an 8-inch (20 cm) springform pan and line the bottom with parchment paper.",
        "In a large bowl, whisk ricotta, sugar, lemon zest, lemon juice, eggs, and olive oil until completely smooth.",
        "Add almond flour, tapioca starch, baking powder, and salt. Fold gently until no dry pockets remain.",
        "Toss blueberries with 1 teaspoon of tapioca starch and fold half into the batter. Pour into the pan and scatter remaining berries on top.",
        "Bake 36–42 minutes until golden and a toothpick comes out clean. Cool 20 minutes before releasing and dusting with powdered sugar."
      ]
    },
    {
      id: "salted-caramel-brownies",
      title: "Salted Caramel Pecan Brownies",
      image: "images/caramel-brownies.jpg",
      time: "35 min",
      yield: "12 fudgy squares",
      difficulty: "Easy",
      categories: ["chocolate", "quick"],
      tags: ["Fudgy", "Refined-Sugar Option", "35 Min"],
      summary:
        "Crinkly shiny tops, molten dark-chocolate centers, toasted pecans, and a ribbon of buttery sea-salt caramel.",
      ingredients: [
        "170 g (6 oz) 70% dark chocolate, finely chopped",
        "115 g (½ cup) unsalted butter (or vegan butter)",
        "200 g (1 cup) light brown sugar, packed",
        "3 large eggs, room temperature + 1 tsp vanilla extract",
        "65 g (½ cup) certified gluten-free oat flour",
        "30 g (⅓ cup) Dutch-process cocoa powder",
        "½ tsp flaky sea salt + 80 g (¾ cup) toasted chopped pecans",
        "90 ml (⅓ cup) warm salted caramel sauce for swirling"
      ],
      steps: [
        "Preheat oven to 350°F (175°C) and line an 8x8-inch (20 cm) square pan with parchment overhang.",
        "Melt dark chocolate and butter together over a double boiler (or 30-second microwave bursts). Let cool 5 minutes.",
        "Whisk eggs, brown sugar, and vanilla vigorously for 2 minutes until pale and glossy—this creates the signature crackly top.",
        "Whisk in warm chocolate mixture, then fold in oat flour, cocoa powder, and half the pecans.",
        "Spread batter in pan, dollop caramel over top, swirl with a butter knife, and scatter remaining pecans. Bake 24–27 minutes. Finish with flaky sea salt and cool completely before slicing."
      ]
    },
    {
      id: "raspberry-pistachio-pavlova",
      title: "Raspberry Pistachio Pavlova",
      image: "images/raspberry-pavlova.jpg",
      time: "1 hr 30 min",
      yield: "8 servings",
      difficulty: "Medium",
      categories: ["cakes", "dairy-free"],
      tags: ["Naturally GF", "Showstopper", "Nutty & Crisp"],
      summary:
        "A crisp, whisper-thin meringue shell with a marshmallow-soft center, crowned with vanilla whipped cream, ruby berries, and roasted pistachios.",
      ingredients: [
        "4 large egg whites, room temperature (about 140 g)",
        "220 g (1 cup + 2 tbsp) superfine caster sugar",
        "1½ tsp cornstarch or tapioca starch",
        "1 tsp white wine vinegar + 1 tsp vanilla bean paste",
        "300 ml (1¼ cups) cold heavy cream (or chilled coconut cream)",
        "250 g (2 cups) fresh raspberries",
        "45 g (⅓ cup) roasted unsalted pistachios, roughly crushed",
        "3 tbsp raspberry coulis or warmed seedless raspberry jam"
      ],
      steps: [
        "Preheat oven to 250°F (120°C). Draw an 8-inch circle on parchment paper and flip it ink-side down on a baking sheet.",
        "Whip egg whites to soft peaks. Add sugar 1 tablespoon at a time, beating on medium-high for 6–8 minutes until stiff, glossy, and completely smooth between your fingers.",
        "Fold in starch, vinegar, and vanilla. Mound onto the circle and shape a shallow crater in the center with the back of a spoon.",
        "Bake 75 minutes without opening the oven. Turn off heat, crack the door open, and cool completely inside the oven (at least 1 hour).",
        "Just before serving, fill with softly whipped cream, pile high with raspberries, drizzle coulis, and scatter crushed pistachios."
      ]
    },
    {
      id: "chocolate-ganache-tart",
      title: "Dark Chocolate Berry Ganache Tart",
      image: "images/hero-tart.jpg",
      time: "30 min",
      yield: "10 slices",
      difficulty: "Easy",
      categories: ["cakes", "chocolate", "dairy-free", "quick"],
      tags: ["No-Bake Filling", "Dairy-Free Option", "30 Min"],
      summary:
        "A toasted almond-cacao crust filled with velvety 70% dark chocolate ganache and topped with fresh berries.",
      ingredients: [
        "180 g (1¾ cups) almond flour + 30 g (⅓ cup) cocoa powder",
        "3 tbsp pure maple syrup + 45 g (3 tbsp) melted coconut oil or butter",
        "Pinch of espresso powder & flaky sea salt",
        "250 g (9 oz) 70% dark chocolate, finely chopped",
        "240 ml (1 cup) heavy cream or full-fat canned coconut milk",
        "Fresh raspberries, blackberries, and toasted sliced almonds for topping"
      ],
      steps: [
        "Preheat oven to 350°F (175°C). Mix almond flour, cocoa, maple syrup, melted coconut oil, and salt until sandy dough forms.",
        "Press firmly into a 9-inch fluted tart pan with removable bottom. Bake 11–13 minutes until fragrant; cool completely.",
        "Heat cream (or coconut milk) until steaming around the edges. Pour over chopped chocolate, wait 2 minutes, then stir slowly from the center until glossy.",
        "Pour ganache into the cooled crust, chill 2 hours until set, and garnish with berries and toasted almonds."
      ]
    }
  ]
};
