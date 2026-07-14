import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Button, ButtonGroup } from "react-bootstrap";
import Particle from "../Particle";
import fallbackPdf from "../../Assets/myResume.pdf";
import { AiOutlineDownload } from "react-icons/ai";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { getResume } from "../../api";
import SectionLoader from "../SectionLoader";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

function ResumeNew() {
  const [pdfData, setPdfData] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(fallbackPdf);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageWidth, setPageWidth] = useState(800);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const updateWidth = useCallback(() => {
    const w = window.innerWidth;
    if (w < 576) setPageWidth(Math.min(w - 40, 360));
    else if (w < 992) setPageWidth(Math.min(w - 80, 640));
    else setPageWidth(820);
  }, []);

  useEffect(() => {
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [updateWidth]);

  useEffect(() => {
    let cancelled = false;
    let objectUrl = null;

    const loadResume = async () => {
      setLoading(true);
      setError("");
      setPageNumber(1);
      setNumPages(null);

      try {
        const { data } = await getResume();
        const sourceUrl = data?.available
          ? `${API_URL}/api/resume/file?t=${Date.now()}`
          : fallbackPdf;

        const response = await fetch(sourceUrl);
        if (!response.ok) throw new Error("Failed to fetch resume");

        const buffer = await response.arrayBuffer();
        if (cancelled) return;

        // Fresh copy for pdf.js (it may transfer/detach the buffer)
        const bytes = new Uint8Array(buffer);
        setPdfData({ data: bytes.slice(0) });

        objectUrl = URL.createObjectURL(
          new Blob([bytes], { type: "application/pdf" })
        );
        setDownloadUrl(objectUrl);
      } catch (err) {
        if (!cancelled) {
          setError("Could not load the latest resume.");
          setPdfData(fallbackPdf);
          setDownloadUrl(fallbackPdf);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadResume();
    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, []);

  const onDocumentLoadSuccess = ({ numPages: nextNumPages }) => {
    setNumPages(nextNumPages);
    setPageNumber(1);
    setError("");
  };

  const goPrev = () => setPageNumber((p) => Math.max(1, p - 1));
  const goNext = () => setPageNumber((p) => Math.min(numPages || 1, p + 1));

  return (
    <div>
      <Container fluid className="resume-section">
        <Particle />

        <div className="resume-toolbar">
          <div className="resume-toolbar-inner">
            {!loading && numPages > 1 && (
              <div className="resume-pager">
                <ButtonGroup>
                  <Button
                    variant="outline-light"
                    size="sm"
                    onClick={goPrev}
                    disabled={pageNumber <= 1}
                    aria-label="Previous page"
                  >
                    <BiChevronLeft size={20} />
                  </Button>
                  <Button variant="outline-light" size="sm" disabled>
                    {pageNumber} / {numPages}
                  </Button>
                  <Button
                    variant="outline-light"
                    size="sm"
                    onClick={goNext}
                    disabled={pageNumber >= numPages}
                    aria-label="Next page"
                  >
                    <BiChevronRight size={20} />
                  </Button>
                </ButtonGroup>
              </div>
            )}
          </div>
        </div>

        {error && <p className="resume-status resume-status-warn">{error}</p>}
        {loading && <SectionLoader label="Loading resume" />}

        <div className="resume-stage">
          {!loading && pdfData && (
            <div className="resume-paper">
              <Document
                file={pdfData}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={
                  <SectionLoader
                    label="Rendering resume"
                    className="section-preloader--compact"
                  />
                }
                error={
                  <div className="resume-paper-error">
                    Preview failed. Please use Download CV.
                  </div>
                }
                onLoadError={() =>
                  setError("Preview failed. Please use Download CV.")
                }
              >
                <Page
                  pageNumber={pageNumber}
                  width={pageWidth}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  className="resume-page"
                />
              </Document>
            </div>
          )}
        </div>

        {!loading && (
          <div className="resume-toolbar resume-toolbar-bottom">
            <Button
              variant="primary"
              href={downloadUrl}
              target="_blank"
              rel="noreferrer"
              download="Md_Parwez_Ansari_Resume.pdf"
              className="resume-download-btn"
            >
              <AiOutlineDownload />
              &nbsp;Download CV
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
}

export default ResumeNew;
