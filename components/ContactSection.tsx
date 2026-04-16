"use client";
import { Button } from "@/components/ui/button";
import { FloatingInput } from "@/components/ui/floating-input";
import { FloatingTextarea } from "@/components/ui/floating-textarea";
import { FloatingSelect } from "@/components/ui/floating-select";
import { motion } from "framer-motion";
const contactImage = "/assets/contact-image.jpg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { useWordPressPage } from "@/hooks/useWordPressPage";
import { useTranslations } from "@/hooks/useLanguage";

const contactSchema = z.object({
  assunto: z.string().min(1, "Selecione um assunto"),
  nome: z.string().trim().min(1, "Nome é obrigatório").max(100, "Nome deve ter menos de 100 caracteres"),
  email: z.string().trim().email("E-mail inválido").max(255, "E-mail deve ter menos de 255 caracteres"),
  whatsapp: z.string().trim().min(1, "WhatsApp é obrigatório").max(20, "WhatsApp inválido"),
  estado: z.string().trim().min(1, "Estado é obrigatório").max(50, "Estado inválido"),
  mensagem: z.string().trim().min(1, "Mensagem é obrigatória").max(1000, "Mensagem deve ter menos de 1000 caracteres")
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactSection = () => {
  const { data } = useWordPressPage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = useTranslations();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>({
resolver: zodResolver(contactSchema as any),
    defaultValues: {
      assunto: ""
    }
  });

  const onSubmit = async (formData: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const { data: result, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          ...formData,
          recipientEmail: data?.acf?.contato?.email || 'claudia.trevizan@gmail.com'
        }
      });

      if (error) throw error;

      toast.success("Mensagem enviada com sucesso!");
      reset();
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Erro ao enviar mensagem. Por favor, tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="pt-20 pb-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-12 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="col-span-12 md:col-span-5"
          >
            <img
              src={data?.acf?.contato?.imagem || contactImage}
              alt="Fale com Elas no Poder"
              className="w-full h-full object-cover"
              style={{ borderRadius: '8px' }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="col-span-12 md:col-span-7 space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-black" style={{ color: '#481276' }}>
              {data?.acf?.contato?.titulo || "Fale com Elas no Poder"}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-12 gap-8">
                <div className="col-span-12">
                  <FloatingSelect
                    label={t.form.selectSubject}
                    id="assunto"
                    {...register("assunto")}
                    className={errors.assunto ? "border-[#B84D01]" : "border-[#DBDBDB]"}
                  >
                    <option value="" disabled>{t.form.selectPlaceholder}</option>
                    <option value="ouvidoria">{t.form.options.ombudsman}</option>
                    <option value="parceria">{t.form.options.partnership}</option>
                    <option value="contato">{t.form.options.contact}</option>
                  </FloatingSelect>
                  {errors.assunto && (
                    <p className="text-[#B84D01] text-sm mt-1">{errors.assunto.message}</p>
                  )}
                </div>

                <div className="col-span-12 md:col-span-6">
                  <FloatingInput
                    label={t.form.name}
                    id="nome"
                    {...register("nome")}
                    className={errors.nome ? "border-[#B84D01]" : "border-[#DBDBDB]"}
                  />
                  {errors.nome && (
                    <p className="text-[#B84D01] text-sm mt-1">{errors.nome.message}</p>
                  )}
                </div>

                <div className="col-span-12 md:col-span-6">
                  <FloatingInput
                    label={t.form.email}
                    id="email"
                    type="email"
                    {...register("email")}
                    className={errors.email ? "border-[#B84D01]" : "border-[#DBDBDB]"}
                  />
                  {errors.email && (
                    <p className="text-[#B84D01] text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div className="col-span-12 md:col-span-6">
                  <FloatingInput
                    label={t.form.whatsapp}
                    id="whatsapp"
                    type="tel"
                    {...register("whatsapp")}
                    className={errors.whatsapp ? "border-[#B84D01]" : "border-[#DBDBDB]"}
                  />
                  {errors.whatsapp && (
                    <p className="text-[#B84D01] text-sm mt-1">{errors.whatsapp.message}</p>
                  )}
                </div>

                <div className="col-span-12 md:col-span-6">
                  <FloatingInput
                    label={t.form.state}
                    id="estado"
                    {...register("estado")}
                    className={errors.estado ? "border-[#B84D01]" : "border-[#DBDBDB]"}
                  />
                  {errors.estado && (
                    <p className="text-[#B84D01] text-sm mt-1">{errors.estado.message}</p>
                  )}
                </div>

                <div className="col-span-12">
                  <FloatingTextarea
                    label={t.form.message}
                    id="mensagem"
                    {...register("mensagem")}
                    className={errors.mensagem ? "border-[#B84D01]" : "border-[#DBDBDB]"}
                  />
                  {errors.mensagem && (
                    <p className="text-[#B84D01] text-sm mt-1">{errors.mensagem.message}</p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                variant="outline"
                className="h-14 font-normal w-fit rounded-lg transition-colors"
                disabled={isSubmitting}
                style={{
                  color: '#B80F66',
                  backgroundColor: '#fff',
                  border: '1px solid #B80F66'
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.backgroundColor = '#6b1441';
                    e.currentTarget.style.borderColor = '#6b1441';
                    e.currentTarget.style.color = '#fff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.backgroundColor = '#fff';
                    e.currentTarget.style.borderColor = '#B80F66';
                    e.currentTarget.style.color = '#B80F66';
                  }
                }}
              >
                {isSubmitting ? t.form.submitting : t.form.submit}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
