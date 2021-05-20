const { Midi } = require("@tonejs/midi");
const fs = require("fs");

function main() {
  const midiContent = fs.readFileSync("./input.mid");
  const midi = new Midi(midiContent);

  const notes = midi.tracks[0].notes;

  const notesArrayContent = notes
    .map(
      (n) =>
        `{NOTE_${n.name.replace("#", "S")}, ${Math.trunc(n.duration * 1000)}}`
    )
    .join(", ");

  const templateContent = fs.readFileSync("./template.ino", "utf8");
  const filledTemplate = templateContent.replace(
    "/*** NOTES HERE ***/",
    notesArrayContent
  );

  fs.writeFileSync("./output.ino", filledTemplate);
}

main();
