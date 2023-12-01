import fse from "fs-extra";
import imagemin from "imagemin";
import imageminJpegtran from "imagemin-jpegtran";
import imageminPngquant from "imagemin-pngquant";
import imageminSvgo from "imagemin-svgo";
import imageminWebp from "imagemin-webp";
import imageminGifsicle from "imagemin-gifsicle";
import sharp from "sharp";

let inputFolder = "src";
let outputFolder = "opt";
let targetWidth = 1920;

const processImg = async () => {
    try {
        const files = await fse.readdir(inputFolder);

        for (const file of files) {
            let inputPath = `${inputFolder}/${file}`;
            let outputPath = `${outputFolder}/${file}`;

            await sharp(inputPath).resize(targetWidth).toFile(outputPath);

            await imagemin([outputPath], {
                destination: outputFolder,
                plugins: [
                    imageminJpegtran({ quality: 80 }), //Comprime JPG con 80% de calidad
                    imageminPngquant(), //Comprime PNG
                    imageminSvgo(), //Comprime SVG
                    imageminWebp({ quality: 80 }), //Comprime WebP con calidad del 80%
                    imageminGifsicle() //Comprime GIF
                ]
            })

            console.log(`Se ha optimizado la imagen: ${file}`);
        }
        console.log("Se ha terminado la optimización de todas tus imagenes");
    } catch (error) {
        console.error(error);
    }
}

processImg();