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

export const DICTIONARIES = ["en_US", "en_CMUDICT"] as const;

export async function get_matches(
	input: string,
	dict: (typeof DICTIONARIES)[number] = DICTIONARIES[0],
): Promise<string[]> {
	const { stdout } = Deno.spawn("./engine", {
		args: [input.trim(), `--dict=./dictionaries/${dict}.txt`],
		stdout: "piped",
	});

	const output = (await stdout.text()).trim();

	return output.split("\n");
}
