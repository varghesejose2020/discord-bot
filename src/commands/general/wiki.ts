import CommandInt from "../../interfaces/CommandInt";

const wiki: CommandInt = {
  name: "wiki",
  description: "Returns a URL to a wikipedia article based on the **query**.",
  parameters: ["`<query>`: terms to search for"],
  category: "general",
  run: async (message) => {
    try {
      const { channel, commandArguments } = message;

      // Get the arguments as a Wikipedia search query.
      const query = commandArguments.join("_");

      // Check if the query is empty.
      if (!query || !query.length) {
        await message.reply(
          "Would you please try the command again, and provide the term you want me to search for?"
        );
        await message.react(message.Becca.no);
        return;
      }

      // Send the Wikipedia url to the current channel.
      await channel.send(
        `Here is what I found: https://en.wikipedia.org/wiki/${query}`
      );
      await message.react(message.Becca.yes);
    } catch (error) {
      await message.react(message.Becca.no);
      if (message.Becca.debugHook) {
        message.Becca.debugHook.send(
          `${message.guild?.name} had an error with the wiki command. Please check the logs.`
        );
      }
      console.log(
        `${message.guild?.name} had the following error with the wiki command:`
      );
      console.log(error);
      message.reply("I am so sorry, but I cannot do that at the moment.");
    }
  },
};

export default wiki;
