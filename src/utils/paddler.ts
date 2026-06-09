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

export function get_dicts(): string[] {
	return Deno.readDirSync("./dictionaries")
		.flatMap((entry) => {
			if (!entry.isFile) {
				return [];
			}

			return [entry.name];
		})
		.toArray();
}

export function validate_dict_string(
	dicts: string[],
	val: string | null,
): string | null {
	return val ? (dicts.includes(val) ? val : null) : null;
}

export async function get_matches(
	input: string,
	dict: string,
): Promise<string[]> {
	const { stdout } = Deno.spawn("./engine", {
		args: [input.trim(), `--dict=./dictionaries/${dict}.txt`],
		stdout: "piped",
	});

	const output = (await stdout.text()).trim();

	return output.split("\n");
}
