const API_BASE = "/api/v1";

let lista = [
    { name: 'George Washington',
      short_description: '1st president of the United States (1732–1799)',
      gender: 'Male',
      country: 'United States of America',
      occupation: 'Politician',
      birth_year: 1732,
      death_year: 1799,
      age_of_death: 67    
    },
    { name: 'Douglas Adams',
      short_description: 'English writer and humorist',
      gender: 'Male',
      country: 'United Kingdom',
      occupation: 'Artist',
      birth_year: 1952,
      death_year: 2001,
      age_of_death: 49    
    },
    { name: 'Abraham Lincoln',
      short_description: '16th president of the United States (1809-1865)',
      gender: 'Male',
      country: 'United States of America',
      occupation: 'Politican',
      birth_year: 1809,
      death_year: 1865,
      age_of_death: 56    
    },
    { name: 'Wolfgang Amadeus Mozart',
      short_description: 'Austrian composer of the Classical period',
      gender: 'Male',
      country: 'Archduchy of Austria',
      occupation: 'Artist',
      birth_year: 1756,
      death_year: 1791,
      age_of_death: 35    
    },
    { name: 'Adolf Hitler',
      short_description: 'chancellor and Führer of Germany, leader of the Nazi Party',
      gender: 'Male',
      country: 'Germany',
      occupation: 'Statesperson',
      birth_year: 1889,
      death_year: 1945,
      age_of_death: 56    
    },
    { name: 'J. R. R. Tolkien',
      short_description: 'British philologist and author of classic high fantasy works',
      gender: 'Male',
      country: 'United Kingdom',
      occupation: 'Researcher',
      birth_year: 1892,
      death_year: 1973,
      age_of_death: 81    
    },
    { name: 'Charles Darwin',
      short_description: 'British naturalist, author of "On the origin of species, by means of natural selection" (1809-1882)',
      gender: 'Male',
      country: 'United Kingdom',
      occupation: 'Researcher',
      birth_year: 1809,
      death_year: 1882,
      age_of_death: 73    
    },
    { name: 'John Lennon',
      short_description: 'English singer and songwriter, founding member of The Beatles (1940-1980)',
      gender: 'Male',
      country: 'United Kingdom',
      occupation: 'Artist',
      birth_year: 1940,
      death_year: 1980,
      age_of_death: 80    
    },
    { name: 'Ramesses IV',
      short_description: 'the third pharaoh of the Twentieth Dynasty of the New Kingdom of Ancient Egypt',
      gender: 'Male',
      country: 'Ancient Egypt',
      occupation: 'Statesperson',
      birth_year: -1200,
      death_year: -1149,
      age_of_death: 51    
    },
    { name: 'Louis Armstrong',
      short_description: 'American jazz trumpeter, composer and singer',
      gender: 'Male',
      country: 'United States of America',
      occupation: 'Artist',
      birth_year: 1900,
      death_year: 1971,
      age_of_death: 71    
    },
    { name: 'Michael Jackson',
      short_description: 'American recording artist; singer and songwriter (1958-2009)',
      gender: 'Male',
      country: 'United States of America',
      occupation: 'Artist',
      birth_year: 1958,
      death_year: 2009,
      age_of_death: 51   
    }];

    
app.get(API_BASE+"/famous-people", (req,res)=>{
    if(JRR.famous_people.lenght == 0){
        JRR.famous_people.push();
    };
    res.send(JSON.stringify(JRR.famous_people));
});