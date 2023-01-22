import fs from 'fs';
import csv from 'csv-parser';

fs.unlink('canada.txt', (err) => {
  if (err) {
    console.log('canada.txt does not exist');
  }
});
fs.unlink('usa.txt', (err) => {
  if (err) {
    console.log('usa.txt does not exist');
  }
});

fs.createReadStream('input_countries.csv')
  .pipe(csv())
  .on('data', (data) => {
    if (data.country === 'Canada') {
      if (!fs.existsSync('canada.txt')) {
        fs.writeFileSync('canada.txt', '');
      }
      fs.appendFileSync('canada.txt', JSON.stringify(data) + '\n');
    }
    if (data.country === 'United States') {
      if (!fs.existsSync('usa.txt')) {
        fs.writeFileSync('usa.txt', '');
      }
      fs.appendFileSync('usa.txt', JSON.stringify(data) + '\n');
    }
  })
  .on('end', () => {
    console.log('File processing complete');
  });
