import express from "express";
import path from "path";
import fs from "fs";
import multer from "multer";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Ensure directories exist
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Setup database persistence path
const dbPath = path.join(uploadsDir, "movies.json");

// Define starter content
const starterMovies = [
  {
    id: "sintel",
    title: "Sintel",
    description: "Sintel is an independently produced short CGI-animated fantasy film created by the Blender Foundation. It tells the story of a girl named Sintel who rescues and forms a deep bond with a baby dragon.",
    genre: "Fantasy, Animation, Adventure",
    language: "English",
    cast: "Sintel, Scales (Dragon)",
    director: "Colin Levy",
    year: "2010",
    rating: 5,
    coverUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    downloadUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    isUploaded: false,
    size: "31 MB",
    category: "movies",
    uploadedAt: new Date("2026-05-15").toISOString()
  },
  {
    id: "big-buck-bunny",
    title: "Big Buck Bunny",
    description: "A large, incredibly friendly woodland rabbit's peaceful morning is disturbed by three bullying forest critters. He decides to turn the tables and teach them a creative lesson in kindness and humor.",
    genre: "Comedy, Animation, Family",
    language: "English",
    cast: "Bunny, Frank, Rinky, Gimbles",
    director: "Sasha Goedegebure",
    year: "2008",
    rating: 4,
    coverUrl: "https://images.unsplash.com/photo-1585647347483-22b66260dfff?w=800&auto=format&fit=crop&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    downloadUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    isUploaded: false,
    size: "18 MB",
    category: "series",
    uploadedAt: new Date("2026-05-20").toISOString()
  },
  {
    id: "scenic-ocean",
    title: " scenic-ocean",
    description: "A calming cinematic escape showing oceanic waves crashing dramatically against scenic cliffs. Designed as high-definition sensory footage to soothe and deliver visual pleasure with high quality production.",
    genre: "Nature, Documentary, Chill",
    language: "Universal",
    cast: "The Ocean, Waves",
    director: "Nature Productions",
    year: "2024",
    rating: 5,
    coverUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    downloadUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    isUploaded: false,
    size: "7 MB",
    category: "dramas",
    uploadedAt: new Date("2026-06-01").toISOString()
  },
  {
    id: "elephants-dream",
    title: "Elephant's Dream",
    description: "The world's first open movie project, Elephant's Dream is a surrealistic computer-animated science fiction film exploring a mechanical fantasy world governed by complex piping and dream logic.",
    genre: "Sci-Fi, Surrealism, Experimental",
    language: "English",
    cast: "Proog, Emo",
    director: "Bassam Kurdali",
    year: "2006",
    rating: 4,
    coverUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    downloadUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    isUploaded: false,
    size: "38 MB",
    category: "bengali",
    uploadedAt: new Date("2026-06-05").toISOString()
  }
];

// Load / Save Movies database helper
function loadMovies() {
  try {
    if (fs.existsSync(dbPath)) {
      const data = fs.readFileSync(dbPath, "utf-8");
      const parsed = JSON.parse(data);
      let changed = false;
      const updated = parsed.map((m: any) => {
        if (!m.category) {
          changed = true;
          // Intelligent categorization fallback so current users get nice sections automatically
          const titleLower = m.title ? m.title.toLowerCase() : "";
          const langLower = m.language ? m.language.toLowerCase() : "";
          const genreLower = m.genre ? m.genre.toLowerCase() : "";
          
          if (langLower.includes("bengali") || langLower.includes("bangla") || titleLower.includes("bangla")) {
            m.category = "bengali";
          } else if (genreLower.includes("drama") || titleLower.includes("drama") || langLower.includes("korean") || langLower.includes("japanese")) {
            m.category = "dramas";
          } else if (genreLower.includes("comedy") || genreLower.includes("family") || genreLower.includes("series") || titleLower.includes("series")) {
            m.category = "series";
          } else {
            m.category = "movies";
          }
        }
        return m;
      });

      if (changed) {
        saveMovies(updated);
      }
      return updated;
    } else {
      fs.writeFileSync(dbPath, JSON.stringify(starterMovies, null, 2), "utf-8");
      return starterMovies;
    }
  } catch (err) {
    console.error("Error reading database:", err);
    return starterMovies;
  }
}

function saveMovies(movies: any[]) {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(movies, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving database:", err);
  }
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    // Escape whitespace and special characters
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.]/g, "_");
    cb(null, `${Date.now()}-${safeName}`);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 150 * 1024 * 1024, // Allow up to 150MB file size
  },
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static resources in /uploads directory
app.use("/uploads", express.static(uploadsDir));

// --- API ENDPOINTS ---

// 1. Fetch all movies
app.get("/api/movies", (req, res) => {
  const movies = loadMovies();
  res.json(movies);
});

// 2. Add movie manually 
app.post("/api/movies", (req, res) => {
  try {
    const { title, description, genre, language, cast, director, year, rating, coverUrl, videoUrl, downloadUrl, size, category } = req.body;
    
    if (!title || !videoUrl) {
      return res.status(400).json({ error: "Title and Video URL are required fields" });
    }

    const movies = loadMovies();
    const newMovie = {
      id: `movie-${Date.now()}`,
      title,
      description: description || "No description provided.",
      genre: genre || "Unknown",
      language: language || "English",
      cast: cast || "N/A",
      director: director || "N/A",
      year: year || new Date().getFullYear().toString(),
      rating: Number(rating) || 5,
      coverUrl: coverUrl || "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&auto=format&fit=crop&q=80",
      videoUrl,
      downloadUrl: downloadUrl || videoUrl,
      isUploaded: false,
      size: size || "N/A",
      category: category || "movies",
      uploadedAt: new Date().toISOString()
    };

    movies.unshift(newMovie);
    saveMovies(movies);

    res.json(newMovie);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Delete a movie (optional management feature)
app.delete("/api/movies/:id", (req, res) => {
  try {
    const { id } = req.params;
    let movies = loadMovies();
    const movieToDelete = movies.find((m: any) => m.id === id);

    if (!movieToDelete) {
      return res.status(404).json({ error: "Movie not found" });
    }

    // If local files exist, delete them too (optional)
    if (movieToDelete.isUploaded) {
      if (movieToDelete.videoUrl && movieToDelete.videoUrl.startsWith("/uploads/")) {
        const filePath = path.join(process.cwd(), movieToDelete.videoUrl);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      }
      if (movieToDelete.coverUrl && movieToDelete.coverUrl.startsWith("/uploads/")) {
        const coverPath = path.join(process.cwd(), movieToDelete.coverUrl);
        if (fs.existsSync(coverPath)) fs.unlinkSync(coverPath);
      }
    }

    movies = movies.filter((m: any) => m.id !== id);
    saveMovies(movies);
    res.json({ success: true, message: `Movie deleted successfully` });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 4. Handle Multipart file uploads (Video & Cover image)
app.post("/api/movies/upload", upload.fields([
  { name: "videoFile", maxCount: 1 },
  { name: "coverFile", maxCount: 1 }
]), (req: any, res) => {
  try {
    const files = req.files;
    const response: any = {};

    if (files.videoFile && files.videoFile[0]) {
      const video = files.videoFile[0];
      response.videoUrl = `/uploads/${video.filename}`;
      // Format file size
      const sizeInMB = (video.size / (1024 * 1024)).toFixed(1);
      response.size = `${sizeInMB} MB`;
    }

    if (files.coverFile && files.coverFile[0]) {
      response.coverUrl = `/uploads/${files.coverFile[0].filename}`;
    }

    res.json({ success: true, ...response });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Interactive movie rating endpoint
app.post("/api/movies/:id/rate", (req, res) => {
  try {
    const { id } = req.params;
    const { rating } = req.body;
    const numRating = Number(rating);

    if (isNaN(numRating) || numRating < 1 || numRating > 5) {
      return res.status(400).json({ error: "Rating must be a number between 1 and 5" });
    }

    const movies = loadMovies();
    const movieIndex = movies.findIndex((m: any) => m.id === id);
    if (movieIndex === -1) {
      return res.status(404).json({ error: "Movie not found" });
    }

    const movie = movies[movieIndex];
    const userRatings = movie.userRatings || [];
    userRatings.push(numRating);

    // Calculate new average rating formatted to 1 decimal place
    const sum = userRatings.reduce((a: number, b: number) => a + b, 0);
    const avg = Number((sum / userRatings.length).toFixed(1));

    movie.userRatings = userRatings;
    movie.rating = avg;

    movies[movieIndex] = movie;
    saveMovies(movies);

    res.json({ success: true, rating: avg, totalRatings: userRatings.length });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 5. Intelligent AI details generator with Gemini
app.post("/api/movies/generate-meta", async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ error: "Please insert a Movie Title to generate metadata." });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Procedural smart fallback to prevent the app from failing when API key is not configured!
      const lowerTitle = title.toLowerCase();
      let genre = "Action, Thriller";
      let description = `An outstanding visual masterpiece centered around "${title}" that captivates audiences with intense drama, great music, and superb acting.`;
      let cast = "John Doe, Sarah Jenkins";
      let director = "Alex Reed";
      let language = "English";
      let year = "2025";
      let rating = 5;

      if (lowerTitle.includes("fight") || lowerTitle.includes("action") || lowerTitle.includes("war")) {
        genre = "Action, Drama";
        description = `An action-packed blockbuster filled with high-octane sequences, strategic battles, and an emotional story of duty and honor.`;
      } else if (lowerTitle.includes("love") || lowerTitle.includes("romance") || lowerTitle.includes("premer") || lowerTitle.includes("prem")) {
        genre = "Romance, Drama";
        description = `একটি রোমান্টিক থ্রিলার চলচ্চিত্র যা প্রেম, আত্মত্যাগ ও ভুল বোঝাবুঝির মধ্য দিয়ে এগিয়ে যায় এবং দর্শক হৃদয়ে এক আবেগময় অনুভূতির সৃষ্টি করে।`;
        language = "Bengali";
        cast = "শাকিব খান, পূজা চেরি";
        director = "রায়হান রাফি";
      } else if (lowerTitle.includes("horror") || lowerTitle.includes("bhut") || lowerTitle.includes("bhoot") || lowerTitle.includes("fear")) {
        genre = "Horror, Mystery";
        description = `An eerie and terrifying journey into the unknown depths of a haunted estate, where long-lost secrets threaten those who dare to enter.`;
      } else if (lowerTitle.includes("comedy") || lowerTitle.includes("hasir") || lowerTitle.includes("fun") || lowerTitle.includes("laughter")) {
        genre = "Comedy, Family";
        description = `A lighthearted family entertainer filled with laughter, wacky misunderstandings, and heartwarming moments that will brighten your day.`;
      } else if (lowerTitle.includes("dhaka") || lowerTitle.includes("dhakar") || lowerTitle.includes("bangla") || lowerTitle.includes("pahar") || lowerTitle.includes("desh")) {
        genre = "Action, Thriller";
        description = `একটি সামাজিক অ্যাকশন থ্রিলার যা বাংলাদেশের বাস্তব প্রেক্ষাপটে তৈরি। চমৎকার অভিনয় এবং মনোমুগ্ধকর সিনেমাটোগ্রাফি এই চলচ্চিত্রের মূল আকর্ষণ।`;
        language = "Bengali";
        cast = "চঞ্চল চৌধুরী, আরিফিন শুভ";
        director = "মোস্তফা সরয়ার ফারুকী";
      }

      return res.json({
        description,
        cast,
        director,
        genre,
        language,
        rating,
        year
      });
    }

    // Initializing Gemini client with strict telemetry headers
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    const prompt = `You are a movie expert and creative assistant. Given the movie title: "${title}", analyze it (it could be in English, Bengali, or Hindi) and generate realistic or accurate metadata.
Generate:
1. Plot/Description (Write in beautiful, engaging language: if the title is in Bengali, make the description in rich Bengali; if the title is in English/Hindi, write in clean English).
2. Cast/Actors (separated by commas).
3. Director Name.
4. Primary Genre (pick 1 to 3 categories like Action, Comedy, Romance, Thriller, Sci-Fi, Drama).
5. Language (like Bengali / Hindi / English).
6. Average Critic Rating (integer between 3 and 5 stars).
7. Year of Release (like "2024").

You must return a raw JSON object with exactly the following keys:
{
  "description": "plot summary...",
  "cast": "actor1, actor2...",
  "director": "Director Name",
  "genre": "Genre1, Genre2...",
  "language": "Language",
  "rating": 5,
  "year": "2024"
}`;

    const rawResponse = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            description: { type: Type.STRING },
            cast: { type: Type.STRING },
            director: { type: Type.STRING },
            genre: { type: Type.STRING },
            language: { type: Type.STRING },
            rating: { type: Type.INTEGER },
            year: { type: Type.STRING }
          },
          required: ["description", "cast", "director", "genre", "language", "rating", "year"]
        }
      }
    });

    const responseText = rawResponse.text;
    if (!responseText) {
       throw new Error("Empty response received from Gemini API");
    }

    let metadata;
    try {
      metadata = JSON.parse(responseText.trim());
    } catch (parseError) {
      const jsonRegex = /\{[\s\S]*\}/;
      const match = responseText.match(jsonRegex);
      if (match) {
        metadata = JSON.parse(match[0]);
      } else {
        throw parseError;
      }
    }
    res.json(metadata);

  } catch (error: any) {
    console.error("Gemini metadata helper failed:", error);
    res.status(500).json({ error: "Failed to generate details. Please fill manually.", details: error.message });
  }
});


// Host Vite Server in development, or serve Static Assets in production
async function runServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Movie Portal full-stack system live at http://0.0.0.0:${PORT}`);
  });
}

runServer();
