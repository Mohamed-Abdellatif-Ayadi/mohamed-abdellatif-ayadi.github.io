import { useState } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/languageContext";
import { FileText, Eye, Play, ExternalLink } from "lucide-react";

interface Publication {
  id: number;
  title: string;
  journal: string;
  date: string;
  description: string;
  tags: string[];
  pdfUrl?: string;
  presentationUrl?: string;
  demoUrl?: string;
}

const Publications = () => {
  const { t, language } = useLanguage();

  // Sample publication data - you can replace this with your actual publications
  const [publications] = useState<Publication[]>([
    {
      id: 1,
      title: "on the Fly data augmentation with ondat",
      journal:
        "International Journal of Mechanical Engineering and Robotics Research (IJMERR), Presented at IEEE ICMRE 2024, Milan, Italy.",
      date: "February 28, 2024",
      description:
        "This research presents a novel, eco-friendly robotic solution to address agricultural slug damage. The robot, developed using Robot Operating System (ROS) and integrated with YOLOv5, autonomously detects and collects slugs without harming them. It employs a ramp and roller mechanism for safe collection and features a GPS-based navigation system designed for rough agricultural terrains. This innovative approach prioritizes sustainability and slug safety, offering a scalable and cost-effective alternative to conventional pest control methods.",
      tags: [
        "ROS",
        "YOLOv5",
        "Python",
        "Navigation",
        "Teamwork & Collaboration",
        "Mapping & Localization",
        "Path Planning",
        "Embedded Systems",
        "Object Detection",
      ],
      pdfUrl: "/publications/slug-detection-robot.pdf",
      presentationUrl: "/publications/slug-detection-presentation.pdf",
      demoUrl: "https://example.com/demo",
    },
  ]);

  const publicationTitles = {
    en: "Publications",
    de: "Veröffentlichungen",
    fr: "Publications",
  };

  const publicationSubtitles = {
    en: "Research papers, conference proceedings, and technical publications",
    de: "Forschungsarbeiten, Konferenzbeiträge und technische Veröffentlichungen",
    fr: "Articles de recherche, actes de conférence et publications techniques",
  };

  const buttonLabels = {
    readPublication: {
      en: "📄 Read Publication",
      de: "📄 Publikation lesen",
      fr: "📄 Lire la publication",
    },
    viewPresentation: {
      en: "👁 View Presentation",
      de: "👁 Präsentation ansehen",
      fr: "👁 Voir la présentation",
    },
    viewDemo: {
      en: "▶ View Demo",
      de: "▶ Demo ansehen",
      fr: "▶ Voir la démo",
    },
    journal: {
      en: "Journal:",
      de: "Zeitschrift:",
      fr: "Journal:",
    },
    date: {
      en: "Date:",
      de: "Datum:",
      fr: "Date:",
    },
  };

  return (
    <>
      <Helmet>
        <title>
          {publicationTitles[language as keyof typeof publicationTitles] ||
            publicationTitles.en}{" "}
          - Mohamed Abdellatif Ayadi
        </title>
        <meta
          name="description"
          content={
            publicationSubtitles[
              language as keyof typeof publicationSubtitles
            ] || publicationSubtitles.en
          }
        />
      </Helmet>

      {/* Header Section */}
      <div className="bg-gradient-to-br from-primary-700 to-primary-900 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {publicationTitles[language as keyof typeof publicationTitles] ||
                publicationTitles.en}
            </h1>
            <p className="text-lg opacity-90">
              {publicationSubtitles[
                language as keyof typeof publicationSubtitles
              ] || publicationSubtitles.en}
            </p>
          </div>
        </div>
      </div>

      {/* Publications List */}
      <div className="py-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {publications.map((publication) => (
              <Card
                key={publication.id}
                className="mb-8 p-8 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="space-y-6">
                  {/* Title */}
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight">
                    {publication.title}
                  </h2>

                  {/* Journal and Date */}
                  <div className="space-y-2 text-sm text-slate-600">
                    <p>
                      <span className="font-medium">
                        {buttonLabels.journal[
                          language as keyof typeof buttonLabels.journal
                        ] || buttonLabels.journal.en}
                      </span>{" "}
                      <span className="italic">{publication.journal}</span>
                    </p>
                    <p>
                      <span className="font-medium">
                        {buttonLabels.date[
                          language as keyof typeof buttonLabels.date
                        ] || buttonLabels.date.en}
                      </span>{" "}
                      {publication.date}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-slate-700 leading-relaxed">
                    {publication.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {publication.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-slate-100 text-slate-700 hover:bg-slate-200"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 pt-4">
                    {publication.pdfUrl && (
                      <Button
                        variant="default"
                        size="sm"
                        asChild
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <a
                          href={publication.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          {buttonLabels.readPublication[
                            language as keyof typeof buttonLabels.readPublication
                          ] || buttonLabels.readPublication.en}
                        </a>
                      </Button>
                    )}

                    {publication.presentationUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="border-blue-300 text-blue-600 hover:bg-blue-50"
                      >
                        <a
                          href={publication.presentationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          {buttonLabels.viewPresentation[
                            language as keyof typeof buttonLabels.viewPresentation
                          ] || buttonLabels.viewPresentation.en}
                        </a>
                      </Button>
                    )}

                    {publication.demoUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="border-red-300 text-red-600 hover:bg-red-50"
                      >
                        <a
                          href={publication.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          {buttonLabels.viewDemo[
                            language as keyof typeof buttonLabels.viewDemo
                          ] || buttonLabels.viewDemo.en}
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-16 bg-primary-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl md:text-2xl font-bold mb-6">
            Interested in Collaboration?
          </h2>
          <p className="max-w-xl mx-auto mb-8 opacity-90">
            I'm always open to discussing research opportunities, collaboration
            on innovative projects, and sharing knowledge in robotics and AI.
          </p>
          <Button variant="secondary" asChild>
            <a href="mailto:mohamed.ayadi.data@gmail.com">
              <ExternalLink className="w-5 h-5 mr-2" />
              Get in Touch
            </a>
          </Button>
        </div>
      </section>
    </>
  );
};

export default Publications;
