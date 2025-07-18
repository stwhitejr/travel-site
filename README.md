This is a photo gallery based website built entirely off my iPhone photos. Using various scripts I can ingest the photos metadata and derive a list of locations, tags and photo metadata that can be uploaded to my Supabase tables. This data drives the entire website with almost no "baked in" content. This application will offer 2 main user experiences.

## Categories

The category pages are 100% derived from the keywords/tags found on the photos at time of ingestion. It'll take the highest rated photo and use that as a "tile" photo on the category list page. Once on the category page we use a photo tags join table to get the list of photo metadata.

## Locations

The location page uses a list of locations 100% derived from iPhone photo coordinates. In one of the ingestion scripts we implode on locations that are somewhat close together so we don't have locations that are basically right next to each other on the map. The frontend uses Mapbox to create a globe with markers that link to location entity pages.

Once on a location entity page we get all photos that have the correct associated location ID. The coordinates are turned into a human readable address and title during ingestion so no need to look these up on the frontend.

## User Experiences

### Gallery

Using mostly just CSS including grid, filter, and animations I'm able to create a unique (in my opinion) hand built photo gallery. Thanks to TailwindCSS I can easily adjust the grid and styles for mobile. It supports intuitive left/right key clicks or swipes and an autoplay feature on desktop.

### Loading Optimizations

Thanks to NextJS, Vercel and React Intersection Observer I'm able to have a pretty clean loading experience even when loading a handful of images at a time. We do this by using blur data which is generated at ingestion time via a script. This lives with the photo metadata so we always have something to show even if the image isn't loaded yet. When unselected we use a smaller thumbnail version of the photo which is auto generated during the ingestion stage as well. When selected we use a higher resolution photo. We also use higher resolution photos by default and priority setting on NextJS `<Image>` components for the grid items that are larger.

Also, because we're using NextJS with Vercel we get CDN capabilities like optimizing and caching at the server level.

## Ingestion

The `scripts/` folder is where all the ingestion happens. There's a README in there if you want more information but a couple things to call out. We first process photos by resizing, compressing and creating thumbnail versions. During this process we also extract the metadata that we want including any formatting we may need to do to it. Next, we take that photo metadata and derive a list of locations and upload the DB. We're give back location IDs so now we can assign those to our photo metadata. Then we extract the tags from the photo metadata, upload the photo metadata, upload the tags, and create a photo tags join table.

For tagging, there's a couple scripts in there that helped me auto tag my photos. 1 script is more manual where I move photos into a folder and the script will use that folder name as a tag and write it to the photo metadata. Another one uses an AI model to generate a JSON file of pre-defined labels and checks them for a match.

# Developing

```bash
npm run dev
```

## Generate Database Type

`npx supabase gen types typescript --project-id pajqyzcpmfrhpupdtupn > database.types.ts`
