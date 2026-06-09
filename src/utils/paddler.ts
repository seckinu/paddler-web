export const FEATURES = [
	"syllabic",
	"sonorant",
	"consonantal",
	"continuant",
	"delayedrelease",
	"lateral",
	"nasal",
	"strident",
	"voice",
	"spreadglottis",
	"constrictedglottis",
	"anterior",
	"coronal",
	"distributed",
	"labial",
	"high",
	"low",
	"back",
	"round",
	"velaric",
	"tense",
	"long",
	"hightone",
	"highregister",
] as const;

export async function get_matches(input: string): Promise<string[]> {
	const { stdout } = Deno.spawn("./engine", {
		args: [input.trim(), "--dict=en.txt"],
		stdout: "piped",
	});

	const output = (await stdout.text()).trim();

	return output.split("\n");
}
