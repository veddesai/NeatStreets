import ImgCard from "./ImgCard";

const TrashSection: React.FC = () => {

  return (
    <div className="p-16 bg-slate-50 border dark:bg-slate-900">
      <h1 className="font-bold text-blue-800 uppercase dark:text-yellow-500 text-center text-5xl max-lg:text-4xl">
        What Comes under Trash?
      </h1>
      <div className="flex max-md:flex-col justify-between md:p-12 mt-4 gap-8">
        <ImgCard
          title="Wet Waste"
          imageUrl="/src/assets/wet_waste.png"
          description="Wet Waste consists of biodegradable materials like food scraps and organic matter. It decomposes naturally and can be composted to reduce landfill use."
        />

        <ImgCard
          title="Dry Waste"
          imageUrl="/src/assets/dry_waste.png"
          description="Dry Waste includes non-biodegradable materials like plastics, metals, and paper. It can often be recycled, reducing environmental impact."
        />
      </div>
    </div>
  );
};

export default TrashSection;