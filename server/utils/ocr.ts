import sharp from 'sharp';
import { createWorker, PSM } from 'tesseract.js';

// export async function replaceWithWhite(buffer: Buffer): Promise<Buffer> {
// 	const { data, info } = await sharp(buffer)
// 		.ensureAlpha()
// 		.raw()
// 		.toBuffer({ resolveWithObject: true });

// 	const { channels, width, height } = info;

// 	for (let i = 0; i < data.length; i += channels) {
// 		if (data[i]! > 90 || data[i + 1]! > 90) {
// 			data[i] = 255;
// 			data[i + 1] = 255;
// 			data[i + 2] = 255;
// 		} else {
// 			data[i] = 0;
// 			data[i + 1] = 0;
// 			data[i + 2] = 0;
// 		}
// 	}

// 	return await sharp(data, { raw: { width, height, channels } })
// 		.normalise()
// 		.sharpen()
// 		.png()
// 		.toBuffer();
// }

export async function replaceWithWhite(buffer: Buffer): Promise<Buffer> {
	const { data, info } = await sharp(buffer)
		.ensureAlpha()
		.raw()
		.toBuffer({ resolveWithObject: true });

	const { width, height, channels } = info;

	for (let i = 0; i < data.length; i += channels) {
		if (data[i]! > 100 || data[i + 1]! > 100) {
			data[i] = 255;
			data[i + 1] = 255;
			data[i + 2] = 255;
		} else {
			data[i] = 0;
			data[i + 1] = 0;
			data[i + 2] = 0;
		}
	}

	const source = Buffer.from(data);

	for (let y = 1; y < height - 1; y++) {
		for (let x = 1; x < width - 1; x++) {
			const index = (y * width + x) * channels;

			if (source[index] !== 0) continue;

			let whiteNeighbors = 0;

			for (let dy = -1; dy <= 1; dy++) {
				for (let dx = -1; dx <= 1; dx++) {
					if (dx === 0 && dy === 0) {
						continue;
					}

					const neighborIndex = ((y + dy) * width + (x + dx)) * channels;

					if (source[neighborIndex] === 255) {
						whiteNeighbors++;
					}
				}
			}

			if (whiteNeighbors >= 5) {
				data[index] = 255;
				data[index + 1] = 255;
				data[index + 2] = 255;
			}
		}
	}

	return await sharp(data, {
		raw: {
			width,
			height,
			channels,
		},
	})
		.png()
		.toBuffer();
}

export async function recognizeNumber(image: Buffer): Promise<number> {
	const worker = await createWorker('eng');

	await worker.setParameters({
		tessedit_char_whitelist: '0123456789',
		tessedit_pageseg_mode: PSM.SINGLE_WORD,
	});

	const processed = await replaceWithWhite(image);
	const { data } = await worker.recognize(processed);

	const text = data.text.replace(/\D/g, '');

	console.log('Confidence:', data.confidence);

	return Number(text);
}
