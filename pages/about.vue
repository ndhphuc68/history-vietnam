<script setup lang="ts">
/**
 * About page explaining the mission and meaning of the project.
 */
</script>

<template>
  <div class="min-h-screen bg-[#F7FFF7] relative overflow-hidden">
    <!-- Decorative Background Shapes -->
    <div class="absolute inset-0 pointer-events-none opacity-20">
      <div
        class="absolute top-[10%] right-[10%] w-96 h-96 bg-[#FFE66D] rounded-full blur-3xl animate-pulse"
      ></div>
      <div
        class="absolute bottom-[20%] left-[5%] w-72 h-72 bg-[#4ECDC4] rounded-full blur-3xl"
      ></div>
    </div>

    <!-- Hero Section -->
    <section class="relative pt-32 pb-20 px-4 text-center">
      <div class="max-w-4xl mx-auto animate-fade-in">
        <div
          class="inline-block px-6 py-2 mb-8 bg-[#FFE66D] text-[#1A535C] font-black rounded-full text-lg shadow-sm border-2 border-white transform -rotate-1"
        >
          <Icon name="fluent-emoji:seedling" class="mr-2" /> Hạt giống Lịch sử
        </div>
        <h1
          class="text-5xl md:text-7xl font-black text-[#1A535C] mb-8 leading-tight drop-shadow-sm"
        >
          Lịch sử là một <br />
          <span class="text-[#FF6B6B]">chuyến phiêu lưu!</span>
        </h1>
        <p
          class="text-xl md:text-2xl text-[#1A535C] font-medium leading-relaxed max-w-3xl mx-auto opacity-90"
        >
          Bé có biết, mỗi con đường chúng ta đi <br />
          đều có những câu chuyện anh hùng chờ bé khám phá không?
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="max-w-6xl mx-auto px-4 pb-32">
      <div class="grid md:grid-cols-2 gap-16 items-center mb-32">
        <div class="animate-slide-up">
          <h2 class="text-4xl font-black text-[#1A535C] mb-6">
            Bé là niềm tự hào của Việt Nam
          </h2>
          <div
            class="space-y-6 text-lg text-gray-700 leading-relaxed font-medium"
          >
            <p>
              Ngày xưa, ông bà và các vị anh hùng đã rất dũng cảm để bảo vệ đất
              nước mình. Họ đã đánh đuổi giặc ngoại xâm, xây dựng những thành
              phố xinh đẹp để hôm nay chúng ta được sống trong hòa bình.
            </p>
            <p>
              Chúng mình tạo ra trang web này để kể cho bé nghe những chuyện ấy
              một cách thật vui và dễ nhớ. Hy vọng bé sẽ yêu thêm tiếng Việt,
              yêu thêm màu cờ Tổ quốc và luôn tự hào mình là
              <span class="text-[#FF6B6B] font-black">người Việt Nam</span>
              nhé!
            </p>
          </div>
        </div>
        <div
          class="relative group animate-fade-in"
          style="animation-delay: 200ms"
        >
          <div
            class="absolute inset-0 bg-[#FF6B6B] rounded-[50px] rotate-3 group-hover:rotate-1 transition-transform duration-500"
          ></div>
          <div
            class="relative bg-white p-4 rounded-[50px] shadow-2xl border-8 border-white overflow-hidden aspect-square flex items-center justify-center"
          >
            <Icon
              name="fluent-emoji:flag-vietnam"
              class="text-[120px] animate-float"
            />
          </div>
        </div>
      </div>

      <!-- Values Grid -->
      <div class="grid md:grid-cols-3 gap-8">
        <div
          class="bg-white p-10 rounded-[40px] shadow-xl border-t-8 border-[#4ECDC4] hover:scale-[1.02] transition-all"
        >
          <div class="text-5xl mb-6">
            <Icon name="fluent-emoji:open-book" />
          </div>
          <h3 class="text-2xl font-black text-[#1A535C] mb-4">Kể chuyện</h3>
          <p class="font-medium text-gray-600">
            Những sự kiện khô khan được chuyển thể thành các mẩu chuyện kể sinh
            động, dễ nhớ.
          </p>
        </div>

        <div
          class="bg-white p-10 rounded-[40px] shadow-xl border-t-8 border-[#FFE66D] hover:scale-[1.02] transition-all"
        >
          <div class="text-5xl mb-6">
            <Icon name="fluent-emoji:artist-palette" />
          </div>
          <h3 class="text-2xl font-black text-[#1A535C] mb-4">Hình ảnh</h3>
          <p class="font-medium text-gray-600">
            Minh họa tinh tế, mang đậm bản sắc văn hóa nhưng vẫn hiện đại và gần
            gũi với trẻ em.
          </p>
        </div>

        <div
          class="bg-white p-10 rounded-[40px] shadow-xl border-t-8 border-[#FF6B6B] hover:scale-[1.02] transition-all"
        >
          <div class="text-5xl mb-6">
            <Icon name="fluent-emoji:direct-hit" />
          </div>
          <h3 class="text-2xl font-black text-[#1A535C] mb-4">Sự thật</h3>
          <p class="font-medium text-gray-600">
            Đảm bảo tính chính xác lịch sử tuyệt đối, giúp các bé có nền tảng
            kiến thức vững chắc.
          </p>
        </div>
      </div>

      <!-- Proverbs Section -->
      <div class="mt-24 mb-12 text-center animate-fade-in">
        <h2
          class="text-3xl md:text-4xl font-black text-[#1A535C] mb-12 relative inline-block"
        >
          Lời ru của Đất Mẹ
          <div
            class="absolute -bottom-4 left-0 w-full h-2 bg-[#FFE66D] rounded-full opacity-50"
          ></div>
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <!-- Quote 1 -->
          <div
            class="bg-[#FDF6E3] p-8 rounded-[30px] border-l-8 border-[#FF6B6B] shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow"
          >
            <span class="text-4xl opacity-50">“</span>
            <p class="text-xl font-bold text-[#1A535C] leading-relaxed italic">
              Con người có tổ có tông,<br />
              Như cây có cội, như sông có nguồn.
            </p>
          </div>

          <!-- Quote 2 -->
          <div
            class="bg-[#E0F2F1] p-8 rounded-[30px] border-l-8 border-[#4ECDC4] shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow"
          >
            <span class="text-4xl opacity-50">“</span>
            <p class="text-xl font-bold text-[#1A535C] leading-relaxed italic">
              Nhiễu điều phủ lấy giá gương,<br />
              Người trong một nước phải thương nhau cùng.
            </p>
          </div>

          <!-- Quote 3 -->
          <div
            class="bg-[#FFFDE7] p-8 rounded-[30px] border-l-8 border-[#FFE66D] shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow"
          >
            <span class="text-4xl opacity-50">“</span>
            <p class="text-xl font-bold text-[#1A535C] leading-relaxed italic">
              Ăn quả nhớ kẻ trồng cây,<br />
              Uống nước nhớ nguồn.
            </p>
          </div>

          <!-- Quote 4 -->
          <div
            class="bg-[#FCE4EC] p-8 rounded-[30px] border-l-8 border-[#E91E63] shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow"
          >
            <span class="text-4xl opacity-50">“</span>
            <p class="text-xl font-bold text-[#1A535C] leading-relaxed italic">
              Dân ta phải biết sử ta,<br />
              Cho tường gốc tích nước nhà Việt Nam.
            </p>
          </div>
        </div>
      </div>
      <div
        class="mt-24 bg-white/60 backdrop-blur-sm rounded-[50px] p-8 md:p-12 border-4 border-dashed border-[#1A535C]/10 animate-slide-up"
      >
        <div class="flex flex-col md:flex-row items-center gap-12">
          <div class="flex-1">
            <h2
              class="text-3xl font-black text-[#1A535C] mb-6 flex items-center gap-3"
            >
              <Icon name="fluent-emoji:rocket" /> Nỗ lực cá nhân & Công nghệ
            </h2>
            <div class="space-y-4 text-gray-700 font-medium leading-relaxed">
              <p>
                Dự án này được xây dựng hoàn toàn bởi
                <strong>PhucNDH</strong> với tâm huyết mang lại một cách học sử
                mới mẻ cho các em nhỏ.
              </p>
              <p>
                Vì là dự án cá nhân, mình đã sử dụng
                <strong>công nghệ AI</strong> để tạo ra các hình ảnh minh họa
                sinh động. Tuy nhiên, hình ảnh do AI tạo ra đôi khi có thể có
                những chi tiết chưa hoàn toàn chính xác về mặt lịch sử hoặc văn
                hóa.
              </p>
              <div
                class="p-6 bg-[#FF6B6B]/10 rounded-3xl border-2 border-[#FF6B6B]/20"
              >
                <p class="text-[#FF6B6B] font-black italic">
                  "Nếu bạn phát hiện bất kỳ sai sót nào về nội dung hoặc hình
                  ảnh, xin hãy vui lòng báo lại cho mình. Mình sẽ sửa đổi ngay
                  lập tức để hoàn thiện hơn!"
                </p>
              </div>
            </div>
          </div>
          <div
            class="w-32 h-32 md:w-48 md:h-48 bg-[#4ECDC4] rounded-full flex items-center justify-center shadow-inner animate-pulse overflow-hidden border-4 border-white"
          >
            <UiLazyImage
              src="https://avatars.githubusercontent.com/u/56473628?s=400&u=2dcf6cce3f2b30203a1dbf669dd7c4175bbecb77&v=4"
              alt="PhucNDH Avatar"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <!-- Final Message -->
      <div
        class="mt-32 bg-[#1A535C] rounded-[60px] p-12 md:p-20 text-center text-white relative overflow-hidden group"
      >
        <!-- Decoration -->
        <div
          class="absolute -top-20 -right-20 w-64 h-64 bg-white opacity-5 rounded-full group-hover:scale-110 transition-transform duration-700"
        ></div>
        <div
          class="absolute -bottom-20 -left-20 w-64 h-64 bg-[#FF6B6B] opacity-10 rounded-full group-hover:scale-110 transition-transform duration-700"
        ></div>

        <h2 class="text-4xl md:text-5xl font-black mb-8 relative z-10">
          Bạn đã sẵn sàng bước vào hành trình?
        </h2>
        <div
          class="flex flex-col sm:flex-row gap-6 justify-center relative z-10"
        >
          <NuxtLink
            to="/map"
            class="px-12 py-5 bg-[#FF6B6B] text-white font-black text-xl rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all"
          >
            Khám phá Bản đồ <Icon name="fluent-emoji:map" class="ml-2" />
          </NuxtLink>
          <NuxtLink
            to="/lesson"
            class="px-12 py-5 bg-white text-[#1A535C] font-black text-xl rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all"
          >
            Xem Danh sách Bài học
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 1s ease-out forwards;
}

.animate-slide-up {
  opacity: 0;
  animation: slideUp 0.8s ease-out forwards;
  animation-delay: 300ms;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
