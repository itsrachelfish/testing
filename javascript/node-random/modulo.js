var mod = process.argv[2];

for(var i = 0; i < 256; i++)
{
    console.log(i % mod);
}
